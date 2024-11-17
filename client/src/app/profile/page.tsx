"use client";

import React, { useState, useEffect } from "react";
import { CuteInput } from "@components/input";
import { CuteButton } from "@components/button";
import { useAppContext } from "@context";
import { userService } from "@services"; // Assuming an authService is available for API calls
import { useRouter } from "next/navigation";
import styles from "./profile.module.scss";
import { cuteToast } from "@utils";

const UserProfilePage = () => {
  const { user, setUser } = useAppContext(); // Assuming user data is in context
  const router = useRouter();

  // State for handling user input
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePic, setProfilePic] = useState(user?.profileImageUrl || "");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    if (!user?.id) return;
    e.preventDefault();
    setIsLoading(true);
    try {
      // Make API call to update user profile
      const [updatedUser, updateError] = await userService.updateUser(user.id, {
        name,
        email,
        profileImageUrl: profilePic,
      });

      if (!updatedUser) throw updateError;

      setUser(updatedUser); // Assuming context provides an updateUser method
      setMessage("Profile updated successfully!");
    } catch (error) {
      cuteToast(error.message, { type: "error" });
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.profilePage}>
      <h1 className={styles.pageTitle}>User Profile</h1>

      <form onSubmit={handleProfileUpdate} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <CuteInput
            id="name"
            value={name}
            onChange={setName}
            placeholder="Enter your name"
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <CuteInput
            id="email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
            className={styles.input}
            type="email"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="profilePic" className={styles.label}>
            Profile Picture URL
          </label>
          <CuteInput
            id="profilePic"
            value={profilePic}
            onChange={setProfilePic}
            placeholder="Enter profile picture URL"
            className={styles.input}
          />
        </div>

        <div className={styles.buttonContainer}>
          <CuteButton
            type="submit"
            className={styles.saveButton}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </CuteButton>
        </div>
      </form>

      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default UserProfilePage;
