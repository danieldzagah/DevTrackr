// Profile.jsx
import React, { useState, useEffect } from 'react';
import './Profile.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    fullName: 'Michael Asante',
    username: 'michaelsante@outlook.com',
    joinDate: 'June 17, 2025',
    profilePicture: null
  });
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? 'auto' : 'hidden';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profilePicture: URL.createObjectURL(file) });
    }
  };

  const handleSave = () => {
    alert('Profile changes saved!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className={`app-container ${menuOpen ? 'menu-open' : ''}`}>
      {isMobile && menuOpen && (
        <div className="menu-overlay" onClick={toggleMenu}></div>
      )}

      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="appname">DevTrackr</h2>
          {isMobile && (
            <button 
              className="menu-toggle" 
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          )}
        </div>

        <nav className="nav-links">
          <a href="#" onClick={() => isMobile && toggleMenu()}>Home</a>
          <a href="#" onClick={() => isMobile && toggleMenu()}>Add Project</a>
          <a href="#" onClick={() => isMobile && toggleMenu()}>My Projects</a>
          <a href="#" onClick={() => isMobile && toggleMenu()} className="active">Profile</a>
          <button className="logout">Log Out</button>
        </nav>
      </aside>

      <main className="main">
        {isMobile && (
          <button 
            className="mobile-menu-button"
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        )}

        <div className="profile-header-section">
          <h1>Your Profile</h1>
          {profile.profilePicture && (
            <div className="profile-pic-preview">
              <img src={profile.profilePicture} alt="Profile Preview" />
            </div>
          )}
        </div>

        <form className="project-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="projectname"
            />
          </div>

          <div className="form-group">
            <label htmlFor="profile-picture">New Profile Picture (optional)</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="profile-picture"
                onChange={handleFileChange}
                accept="image/*"
                className="upload"
              />
              <span className="file-status">
                {profile.profilePicture ? 'File selected' : 'No file selected.'}
              </span>
            </div>
          </div>

          <div className="profile-info">
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Joined:</strong> {profile.joinDate}</p>
          </div>

          <div className="form-buttons">
            <button type="submit" className="submit">
              Save Changes
            </button>
            <button type="button" className="delete" onClick={() => confirm('Are you sure?') && setProfile({...profile, profilePicture: null})}>
              Delete Photo
            </button>
          </div>
        </form>

        <section className="stats-section">
          <h2>Subscribers (0)</h2>
          <p className="empty-state">No subscribers yet.</p>
        </section>

        <section className="stats-section">
          <h2>Following (0)</h2>
          <p className="empty-state">Not following anyone yet.</p>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
