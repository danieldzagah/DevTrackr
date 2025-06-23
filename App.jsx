import React, { useState, useEffect } from 'react';
import './index.css';  

const AddProject = () => {
  const [project, setProject] = useState({ name: '', description: '', tech: '', file: null });
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false); // Close menu when resizing to desktop
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? 'auto' : 'hidden';
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProject({
      ...project,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(project);
    alert('Project submitted!');
  };

  return (
    <div className={`app-container ${menuOpen ? 'menu-open' : ''}`}>
      {/* Mobile menu overlay */}
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
          <a href="#" onClick={() => isMobile && toggleMenu()}>Profile</a>
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
           
        <h1>Add New Project</h1>
        <form className="project-form" onSubmit={handleSubmit}>

          <label>Project Name</label>
          <input type="text" name="name" placeholder="Enter project name" onChange={handleChange} className="projectname" />

          <label>Description</label>
          <input type="text" textarea name="description" placeholder="Brief description" onChange={handleChange} className="description" />

          <label>Technologies Used</label>
          <input type="text" name="tech" placeholder="e.g.React, PHP, Python..." onChange={handleChange}className="technologiesused" />
          
           <label>Upload Code Folder (choose folder or files)</label>
          <input id="project-code" type="file" name="files"
          onChange={handleChange} className="upload" /> 
          <span><i class="fa fa-cloud-upload"></i></span>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

                
          <button type="submit" className="submit">Submit Project</button>
        </form>
      </main>
    </div>
  );
};

export default AddProject;