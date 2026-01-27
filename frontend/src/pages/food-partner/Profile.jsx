import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  FiArrowLeft,
  FiMapPin,
  FiUsers
} from "react-icons/fi";
import { MdRestaurant } from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import { BsCameraReels } from "react-icons/bs";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      });
  }, [id]);

  return (
    <main className="profile-page">

      <button className="back-btn" onClick={() => navigate(-1)}>
         ❌
      </button>

      <section className="profile-header">
        <div className="profile-meta">
          <img
            className="profile-avatar"
            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500"
            alt="profile"
          />

          <div className="profile-info">
            <h1 className="profile-pill profile-business">
              <MdRestaurant size={18} /> {profile?.name}
            </h1>

            <p className="profile-pill profile-address">
              <FiMapPin size={14} /> {profile?.address}
            </p>
          </div>
        </div>

        {/* 📊 Stats */}
        <div className="profile-stats">
          <div className="profile-stat">
            <GiMeal size={20} className="stat-icon" />
            <span className="profile-stat-value">
               10
            </span>
            <span className="profile-stat-label">total meals</span>
          </div>

          <div className="profile-stat">
            <FiUsers size={20} className="stat-icon" />
            <span className="profile-stat-value">
              114
            </span>
            <span className="profile-stat-label"> served</span>
          </div>
        </div>
      </section>

      <hr className="profile-sep" />

      {/* 🎥 Grid Header */}
      <h3 className="grid-title">
        <BsCameraReels /> Food Reels
      </h3>

      {/* 🎥 Food Grid */}
      <section className="profile-grid">
        {videos.map((v, i) => (
          <div key={i} className="profile-grid-item">
            <video
              className="profile-grid-video"
              src={v.video}
              muted
              autoPlay
              loop
            />
          </div>
        ))}
      </section>

    </main>
  );
};

export default Profile;
