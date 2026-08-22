# Olympian House International (OHI) Admin Panel Operational Manual

Welcome to the OHI Admin Panel operational manual. This guide is designed to help you navigate the backend dashboard and successfully manage the content displayed on the frontend of the OHI website.

> [!NOTE]
> The admin dashboard directly updates the configuration stored in the database. When you modify fields or upload images and press **Save Changes**, these updates are instantly reflected on the live public-facing website.

---

## 1. Accessing the Dashboard

1. **Login:** Navigate to `/dashboard/login` (or the equivalent admin URL configured in your environment).
2. **Authentication:** Enter your administrator credentials.
3. Upon successful login, you will be redirected to the **Overview** dashboard where you can see a summary of your workspace.

---

## 2. Navigating the Sidebar

The left-hand sidebar is your main navigation tool. It provides access to different sections of the workspace:
- **Search Workspace:** Use the search bar at the top of the sidebar to quickly filter and find specific sections.
- **OHI Overview:** A high-level overview of the dashboard.
- **Site Pages (Landing Page Manager):** Used to edit the content of the home page, about page, services page, portfolio, and leadership pages.
- **News & Articles:** A dedicated manager for your blog and news articles.

You can expand or collapse the sidebar using the icon at the top left if you need more screen space while editing.

---

## 3. Managing Site Pages (Landing Page Manager)

To edit the main pages of your website, click on **Site Pages** in the sidebar. This will open the Landing Page Manager.

### Structure of the Manager
The Landing Page Manager is broken down into collapsible sections corresponding to the different blocks on your website (e.g., *Hero*, *About Us*, *OHI Difference*, *Featured Programmes*).

- **Navigation:** Click on the section tabs on the left (or use the sidebar) to scroll directly to the section you wish to edit.
- **Fields:** Each section contains text fields, text areas, and image upload fields that correspond to elements on the live site.

### Editing Content
1. **Text Fields:** Click into any text field (like *Title*, *Kicker*, or *Description*) and type your changes.
2. **Arrays/Lists:** For sections containing multiple items (like *Testimonials* or *Hero Slides*), you will see multiple editable blocks. 
3. **Images:** To update an image, click **Choose file** on an image field and select a file from your computer. A preview will appear.
4. **Saving:** Once you are satisfied with your changes in a specific section, click the **Update** or **Save** button usually located at the bottom or top of that section.
   
> [!IMPORTANT]
> You must click the **Save** button for your changes to be sent to the database. Navigating away without saving will discard any draft changes you have made.

---

## 4. Managing News & Articles

To manage your blog posts and news articles, click on **News & Articles** in the sidebar.

### Interface Overview
The News Manager is split into two halves:
- **Left Sidebar:** Displays a list of all current articles.
- **Right Editor Area:** Displays the editing form for the currently selected article.

### Creating a New Article
1. Click the orange **+ (Plus)** button at the top of the article list on the left.
2. A new "Untitled Article" will be created and selected automatically.
3. Fill in the **Title**, **Slug** (the URL path, e.g., `my-new-article`), and **Publish Date**.
4. Enter **Categories** separated by commas (e.g., `Business, Strategy`).
5. Provide a **Short Description (Snippet)** that will appear on the article preview card.
6. Upload a **Cover Image**.
7. Write the **Full Article Content**. 

> [!TIP]
> The Full Article Content box supports basic markdown. Use double newlines to separate paragraphs, and start lines with `# ` to create large headings.

### Editing or Deleting an Article
- **To Edit:** Click on the article you wish to edit from the left list. Modify the fields on the right, and then click the blue **Save Changes** button at the top right of the editor.
- **To Delete:** Select the article, then click the red **Delete** button at the top right. You will be prompted to confirm the deletion.

> [!WARNING]
> Deleting an article is permanent. Ensure you have selected the correct article before confirming the deletion.

---

## 5. Troubleshooting & Best Practices

- **Changes not reflecting?** If you save a change and don't see it on the live site, try performing a hard refresh (`Ctrl + F5` or `Cmd + Shift + R`) on the live site to clear your browser cache.
- **Image Sizes:** When uploading images, try to use appropriately sized and compressed images (like `.jpeg` or `.webp`) to ensure the website loads quickly for your users.
- **Theme:** You can switch the admin dashboard between Dark and Light mode via the top navigation bar header options.

If you encounter any persistent issues, reach out to your technical support team or the OHI development administrator.
