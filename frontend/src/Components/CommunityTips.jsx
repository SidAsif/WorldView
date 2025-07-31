import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Modal,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Fade,
  Dialog,
  DialogContent,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { API_CONFIG } from "../config/api";
import { getAllCountries } from "../Services";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 8,
  borderRadius: 3,
  p: 4,
  width: "100%",
  maxWidth: 400,
};

export default function CommunityTips() {
  const { user } = useUser();
  const [communityTips, setCommunityTips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [tipCountry, setTipCountry] = useState("");
  const [tipInput, setTipInput] = useState("");
  const [tipImages, setTipImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  // For image gallery modal
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // For edit functionality
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getAllCountries();
        const countries = res.data
          .map((c) => c.name.common)
          .sort((a, b) => a.localeCompare(b)); // sort alphabetically
        setAllCountries(countries);
      } catch (error) {
        console.error("Failed to fetch countries", error);
      }
    };

    fetchCountries();
  }, []);

  async function fetchTips() {
    try {
      const { data } = await axios.get(
        `${API_CONFIG.baseURL}${API_CONFIG.endpoints.getAllStories}`
      );
      setCommunityTips(data);
    } catch (err) {
      toast.error("Failed to load stories.");
    }
  }

  useEffect(() => {
    fetchTips();
  }, []);

  async function getImageKitSignature() {
    try {
      const { data } = await axios.get(
        `${API_CONFIG.baseURL}${API_CONFIG.endpoints.ImageKitAuth}`
      );
      return data;
    } catch (err) {
      toast.error("Failed to get image upload credentials.");
      return null;
    }
  }

  async function uploadToImageKit(file, signatureData) {
    const form = new FormData();
    form.append("file", file);
    form.append("fileName", file.name);
    form.append("signature", signatureData.signature);
    form.append("expire", signatureData.expire);
    form.append("token", signatureData.token);
    form.append("publicKey", signatureData.publicKey);

    try {
      const { data } = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        form
      );
      return data.url;
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error("ImageKit: " + err.response.data.message);
      } else {
        toast.error("Image upload failed.");
      }
      return null;
    }
  }

  const filteredTips = communityTips.filter((tip) =>
    tip.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function authorString(u) {
    if (!u) return "Anonymous";
    return (
      u.username ||
      (u.firstName || u.lastName
        ? `${u.firstName || ""} ${u.lastName || ""}`.trim()
        : "") ||
      u.email ||
      (u.primaryEmailAddress && u.primaryEmailAddress.emailAddress) ||
      "Anonymous"
    );
  }

  function isUserStory(story) {
    return story.author === authorString(user);
  }

  // --- CREATE/EDIT LOGIC ---

  function handleImagesChange(e) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const validFiles = Array.from(files).slice(0, 6 - existingImages.length); // Max 6 including existing
      setTipImages(validFiles);
      setPreviewImages(validFiles.map((file) => URL.createObjectURL(file)));
    }
  }

  function openModalForCreate() {
    setIsEdit(false);
    setModalOpen(true);
    setTipCountry("");
    setTipInput("");
    setTipImages([]);
    setPreviewImages([]);
    setExistingImages([]);
    setEditId(null);
  }

  function openModalForEdit(story) {
    setIsEdit(true);
    setModalOpen(true);
    setTipCountry(story.country);
    setTipInput(story.text);
    setExistingImages(story.images || []); // Existing images stay unless user removes
    setPreviewImages([]);
    setTipImages([]);
    setEditId(story._id);
  }

  function removeExistingImage(idx) {
    setExistingImages((imgs) => imgs.filter((img, i) => i !== idx));
  }

  function removePreviewImage(idx) {
    setTipImages((files) => files.filter((f, i) => i !== idx));
    setPreviewImages((imgs) => imgs.filter((img, i) => i !== idx));
  }

  async function handleSubmitTip(e) {
    e.preventDefault();
    if (!tipCountry.trim() || !tipInput.trim()) {
      toast.error("Please select country and enter your tip.");
      return;
    }
    if (!user) {
      toast.error("Login to submit tips.");
      return;
    }
    const totalImages = existingImages.length + tipImages.length;
    if (totalImages === 0) {
      toast.error("Please upload at least one image.");
      return;
    }
    if (totalImages > 6) {
      toast.error("Max 6 images allowed.");
      return;
    }
    setSubmitting(true);

    let uploadedImageUrls = [];
    // Always upload new images with fresh tokens
    for (const file of tipImages) {
      const signatureData = await getImageKitSignature();
      if (!signatureData) {
        setSubmitting(false);
        toast.error("Failed to get image upload credentials.");
        return;
      }
      const url = await uploadToImageKit(file, signatureData);
      if (url) uploadedImageUrls.push(url);
      else {
        setSubmitting(false);
        toast.error("One or more image uploads failed.");
        return;
      }
    }

    const author = authorString(user);

    const dataToSend = {
      country: tipCountry,
      text: tipInput.trim(),
      images: [...existingImages, ...uploadedImageUrls],
      author,
    };

    try {
      if (isEdit && editId) {
        await axios.put(
          `${API_CONFIG.baseURL}${API_CONFIG.endpoints.updateStory(editId)}`,
          dataToSend
        );
        toast.success("Story updated!");
      } else {
        await axios.post(
          `${API_CONFIG.baseURL}${API_CONFIG.endpoints.createStory}`,
          dataToSend
        );
        toast.success("Story submitted!");
      }

      fetchTips();
      setModalOpen(false);
      setTipCountry("");
      setTipInput("");
      setTipImages([]);
      setPreviewImages([]);
      setExistingImages([]);
      setEditId(null);
    } catch (err) {
      toast.error("Failed to submit story.");
    }
    setSubmitting(false);
  }

  // --- DELETE LOGIC ---

  async function handleDeleteStory(id) {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    try {
      await axios.delete(
        `${API_CONFIG.baseURL}${API_CONFIG.endpoints.deleteStory(id)}`
      );
      toast.success("Story deleted!");
      fetchTips();
    } catch (err) {
      toast.error("Failed to delete story.");
    }
  }

  // --- GALLERY LOGIC ---
  const openGallery = (imagesArr, i = 0) => {
    setGalleryImages(imagesArr);
    setGalleryIndex(i);
    setGalleryOpen(true);
  };
  const closeGallery = () => setGalleryOpen(false);

  // --- UI ---
  return (
    <Box sx={{ mt: 12, mb: 7, px: { xs: 2, md: 0 } }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 1, fontWeight: 700, color: "#222" }}
      >
        Share your experience and stories with us
      </Typography>
      <Box sx={{ mt: 2, mx: "auto", maxWidth: 400, mb: 4 }}>
        <TextField
          placeholder="Search by country"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          size="small"
          sx={{
            bgcolor: "#fff",
            borderRadius: 2,
            "& fieldset": { border: "1.5px solid #e5e7eb" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#757575" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
      >
        {user && (
          <Grid item xs={6} sm={4} md={3}>
            <Card
              sx={{
                minHeight: 270,
                bgcolor: "#fff",
                border: "1.5px dashed #000000ff",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 0,
                cursor: "pointer",
                transition: "box-shadow 0.2s",
                "&:hover": {
                  boxShadow: 6,
                  borderColor: "#000000ff",
                  bgcolor: "#fcfcfc",
                },
              }}
              onClick={openModalForCreate}
            >
              <IconButton sx={{ color: "#000000ff", fontSize: 48 }}>
                <AddIcon fontSize="large" />
              </IconButton>
            </Card>
          </Grid>
        )}
        {filteredTips.length ? (
          filteredTips.map((story) => (
            <Grid item xs={6} sm={4} md={3} key={story._id}>
              <Card
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 3,
                  boxShadow: 3,
                  minHeight: 240,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  transition: "box-shadow 0.2s, transform 0.15s",
                  "&:hover": {
                    boxShadow: 9,
                    transform: "translateY(-4px) scale(1.025)",
                  },
                  cursor:
                    story.images && story.images.length > 1
                      ? "pointer"
                      : "default",
                  position: "relative",
                }}
                onClick={() =>
                  story.images &&
                  story.images.length > 0 &&
                  openGallery(story.images)
                }
              >
                {story.images && story.images.length > 0 && (
                  <Box
                    component="img"
                    src={story.images[0]}
                    alt="Thumbnail"
                    sx={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      transition: "filter 0.2s",
                    }}
                  />
                )}
                {/* Edit/Delete icons shown only for your own posts (not in gallery click area) */}
                {isUserStory(story) && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      zIndex: 15,
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModalForEdit(story);
                      }}
                      color="primary"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteStory(story._id);
                      }}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1, py: 2 }}>
                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    color="primary"
                    sx={{
                      mb: 0.75,
                      textTransform: "capitalize",
                      fontSize: "1.05rem",
                    }}
                  >
                    {story.country}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: "pre-line",
                      mb: 1,
                      fontSize: "1rem",
                      color: "#363636",
                    }}
                  >
                    {story.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontStyle: "italic" }}
                  >
                    - {story.author}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography align="center" variant="body2" color="text.secondary">
              No Stories found for this country.
            </Typography>
          </Grid>
        )}
      </Grid>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEdit(false);
          setEditId(null);
        }}
        closeAfterTransition
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={modalOpen}>
          <Box sx={modalStyle}>
            <Typography
              variant="h6"
              fontWeight={700}
              gutterBottom
              align="center"
            >
              {isEdit ? "Edit Story & Images" : "Share a Story & Images"}
            </Typography>
            <form onSubmit={handleSubmitTip}>
              <TextField
                select
                label="Select Country"
                value={tipCountry}
                onChange={(e) => setTipCountry(e.target.value)}
                required
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="">Select country</MenuItem>
                {allCountries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Tip or Experience"
                value={tipInput}
                onChange={(e) => setTipInput(e.target.value)}
                multiline
                rows={3}
                required
                fullWidth
                sx={{ mb: 2 }}
                placeholder="Share your travel tip, story or trivia..."
              />
              {/* Existing images (for edit) with remove button */}
              {isEdit && existingImages.length > 0 && (
                <Box sx={{ mb: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {existingImages.map((img, idx) => (
                    <Box
                      key={img + idx}
                      sx={{
                        position: "relative",
                        display: "inline-block",
                        mb: 1,
                      }}
                    >
                      <Box
                        component="img"
                        src={img}
                        alt={`Existing Img ${idx + 1}`}
                        sx={{
                          maxHeight: 48,
                          borderRadius: 1,
                          boxShadow: 1,
                          mr: 1,
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => removeExistingImage(idx)}
                        sx={{
                          position: "absolute",
                          right: 2,
                          top: 2,
                          bgcolor: "#fff",
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
              {/* Preview images (newly selected) with remove */}
              <Box sx={{ mb: 2 }}>
                <Button variant="outlined" component="label" sx={{ pr: 3 }}>
                  Upload Images (max 6)
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    multiple
                    onChange={handleImagesChange}
                  />
                </Button>
                {previewImages.map((src, idx) => (
                  <Box
                    key={src}
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      ml: idx > 0 ? 1 : 0,
                      mb: 1,
                    }}
                  >
                    <Box
                      component="img"
                      src={src}
                      alt={`Preview ${idx + 1}`}
                      sx={{
                        maxHeight: 48,
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => removePreviewImage(idx)}
                      sx={{
                        position: "absolute",
                        right: -8,
                        top: -8,
                        bgcolor: "#fff",
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={submitting}
              >
                {submitting
                  ? isEdit
                    ? "Updating..."
                    : "Submitting..."
                  : isEdit
                  ? "Update"
                  : "Submit"}
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
      {/* Image Gallery Modal */}
      <Dialog open={galleryOpen} onClose={closeGallery} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 2, position: "relative" }}>
          <IconButton
            onClick={closeGallery}
            sx={{ position: "absolute", right: 8, top: 8, zIndex: 100 }}
          >
            <CloseIcon />
          </IconButton>
          {galleryImages.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                flexDirection: "column",
              }}
            >
              <Box
                component="img"
                src={galleryImages[galleryIndex]}
                alt={`Gallery Img ${galleryIndex + 1}`}
                sx={{
                  width: "90%",
                  maxHeight: "60vh",
                  borderRadius: 3,
                  objectFit: "contain",
                  mb: 2,
                }}
              />
              {galleryImages.length > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                  {galleryImages.map((src, idx) => (
                    <Box
                      key={src}
                      component="img"
                      src={src}
                      alt={`Thumb ${idx + 1}`}
                      onClick={() => setGalleryIndex(idx)}
                      sx={{
                        cursor: "pointer",
                        width: 48,
                        height: 48,
                        objectFit: "cover",
                        borderRadius: 1,
                        mx: 0.5,
                        border:
                          idx === galleryIndex
                            ? "2px solid #2196f3"
                            : "1px solid #eee",
                        boxShadow: idx === galleryIndex ? 4 : 1,
                        opacity: idx === galleryIndex ? 1 : 0.6,
                        transition:
                          "border 0.2s, box-shadow 0.2s, opacity 0.1s",
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
