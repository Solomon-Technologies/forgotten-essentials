# Instagram Feed Setup Guide

This guide explains how to manage Instagram posts through Shopify Admin using Metaobjects.

## Overview

The Instagram feed on your homepage pulls posts from Shopify Metaobjects. This allows you to manage Instagram posts directly in Shopify Admin without touching any code.

**Flexibility**: You can add as many Instagram posts as you want (up to 50). Simply create more entries and they'll automatically appear in the carousel. Delete entries to remove them from the feed.

## Setup Instructions

### Step 1: Create Instagram Post Metaobject Definition

1. Log in to your **Shopify Admin**
2. Go to **Settings** → **Custom data** → **Metaobjects**
3. Click **Add definition**
4. Fill in the details:
   - **Name**: `Instagram Post`
   - **Type**: `instagram_post` (this must match exactly)
   - **Access**: Select **Storefront** (allows the React app to fetch these)

### Step 2: Add Fields to the Definition

Add the following fields to your metaobject definition:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `image` | **File** (Image) | Yes | The Instagram post image |
| `link` | **Single line text** | Yes | Full URL to Instagram post (e.g., https://instagram.com/p/ABC123) |
| `caption` | **Multi-line text** | No | Caption for the post |
| `order` | **Integer** | Yes | Display order (1, 2, 3, etc.) |

### Step 3: Create Instagram Post Entries

1. Go to **Content** → **Metaobjects** → **Instagram Posts**
2. Click **Add entry**
3. Fill in the fields:
   - **Image**: Upload the Instagram post image
   - **Link**: Paste the Instagram post URL
   - **Caption**: (Optional) Add a caption
   - **Order**: Enter a number (posts are sorted by this)
4. Click **Save**

Repeat for each Instagram post you want to display. You can add anywhere from 1 to 50 posts - the carousel will automatically adjust!

## Managing Instagram Posts

### Adding a New Post
1. Go to **Content** → **Metaobjects** → **Instagram Posts**
2. Click **Add entry**
3. Fill in the fields and save

### Removing a Post
1. Find the post in the list
2. Click on it
3. Click **Delete** at the bottom

### Reordering Posts
Edit the **Order** field on each post. Lower numbers appear first (1, 2, 3...).

## Preview Mode

In preview mode (when Shopify credentials aren't configured), the app shows mock Instagram posts from `src/data/mockData.ts`. Once you connect to Shopify and add Instagram Post metaobjects, the app will automatically fetch and display them.

## Troubleshooting

### Posts not showing up?
1. Make sure metaobject type is exactly `instagram_post` (lowercase, underscore)
2. Verify **Storefront** access is enabled in the definition
3. Check that posts have all required fields filled
4. Try refreshing the page

### Wrong order?
Check the **Order** field values. Posts are sorted numerically (1, 2, 3...).

### Images not loading?
Make sure you've uploaded images to the **Image** field (not just pasting URLs).

## API Details

The React app uses this GraphQL query to fetch posts:

```graphql
query GetInstagramPosts($first: Int!) {
  metaobjects(type: "instagram_post", first: $first) {
    edges {
      node {
        id
        handle
        fields {
          key
          value
        }
      }
    }
  }
}
```

This is handled automatically by the `useInstagramPosts` hook in `src/hooks/useShopify.ts`.
