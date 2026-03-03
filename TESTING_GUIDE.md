# E-Commerce Testing Guide

## Product Discovery & Navigation

### 1. Shop Page ✓
- Navigate to `/shop` - Should display 8 products in grid
- Filter by Category: Select "Outerwear", "Dresses", "Tops", etc. - Products should filter correctly
- Price Range Slider: Adjust slider (0-50,000 INR) - Products should filter by price
- Sort By: Select "Price Low to High", "Price High to Low", "A-Z" - Products should sort correctly
- Reset Filters: Click "Reset filters" button - All filters should clear

### 2. Collections Page ✓
- Navigate to `/collections` - Shows 4 collections: Spring Elegance, Urban Minimal, Heritage Line, Artisan Studio
- Click on any collection - Should redirect to `/shop?collection=CollectionName` with filtered products
- Home Page "Explore Collections" button - Should navigate to `/collections`
- Home Page "View New Arrivals" button - Should navigate to `/shop`

## Product Details & Purchases

### 3. Product Detail Page ✓
- Click on any product card - Should navigate to `/products/[id]` and display product details
- Product Page should show:
  - Full product images with thumbnail gallery (click thumbnails to switch images)
  - Product title, collection, description, and details
  - Price in INR with discount indicator (if applicable)
  - Size and color selection buttons
  - Quantity selector with +/- buttons
  - Add to Cart button with feedback
  - Buy Now button (direct to checkout)
  - Customer reviews with star ratings
  - "Write Review" form (UI ready)
  - Related products from same collection

### 4. Add to Cart Functionality ✓
- From Product Detail Page: Select size, color, quantity, click "Add to Cart"
- Cart should update (check cart icon in navigation for item count)
- From Shop/Collections: Products have quick "Add to Cart" functionality on hover
- Cart context properly tracks:
  - Product ID, title, price, image
  - Size and color selections
  - Quantity
  - Total price calculation

### 5. Shopping Cart Page ✓
- Navigate to `/cart` - Shows all items in cart
- Modify quantities: +/- buttons update totals in real-time
- Remove items: Click remove button
- View summary:
  - Subtotal (sum of all items)
  - Shipping fee (₹10 if cart not empty)
  - Tax calculation (8%)
  - Discount amount (if coupon applied)
  - Final total

## Coupon System ✓

### 6. Apply Coupon Codes
Available test codes:
- `LUXURY10` - 10% off, no minimum
- `SPRING20` - 20% off, minimum ₹20,000
- `FIRST15` - 15% off first purchase, minimum ₹15,000
- `SAVE25` - 25% off, minimum ₹30,000
- `SUMMER5` - 5% off summer collection, minimum ₹10,000

Steps:
1. Go to cart page
2. Enter coupon code in input field
3. Click "Apply" button
4. Should see success message and discount applied
5. Total should update automatically
6. Can remove coupon and try different code

## Checkout & Payment

### 7. Checkout Page ✓
- Navigate from cart "Proceed to Checkout" or from product detail "Buy Now"
- Fill address form:
  - First Name, Last Name (required)
  - Email, Phone (required)
  - Street Address, City, State, Pincode (required)
- Select Payment Method:
  - Credit/Debit Card (requires: Card Number, Name, Expiry MM/YY, CVV)
  - UPI (just select)
  - Net Banking (just select)
- Form validation: Required fields show error messages
- Order summary displays:
  - All items in cart with quantities
  - Itemized prices
  - Subtotal, Shipping, Tax, Discount
  - Final total

### 8. Order Confirmation ✓
- After placing order: "Order Placed Successfully" message appears
- Redirects to `/order-confirmation` page
- Cart automatically clears
- Confirmation page shows:
  - Success message
  - Order number (generated)
  - Estimated delivery date
  - Links to continue shopping or track order

## Currency & Pricing

### 9. INR Pricing Throughout ✓
All prices displayed in Indian Rupees (₹):
- Product listings: ₹15,725 - ₹40,375
- Product details: Shows original and discounted price
- Cart: All calculations in INR
- Checkout: All amounts in INR
- Proper formatting with thousand separators

## Navigation & UI

### 10. Navigation Bar ✓
- Logo: Links to home page
- Shop link: Takes to shop page
- Cart icon: Shows item count, links to cart
- Mobile menu: Hamburger menu on small screens, includes all links

## Known Working Features

✓ Product discovery through shop filtering and categories
✓ Product detail pages with images, reviews, and specifications  
✓ Add to cart from multiple locations (product cards, detail page)
✓ Shopping cart with quantity adjustment and item removal
✓ Coupon code system with validation and discount calculation
✓ Checkout process with address and payment info
✓ Order confirmation and cart clearing
✓ INR currency throughout
✓ Responsive design on mobile and desktop
✓ All images properly displaying
✓ Form validation with error messages

## Troubleshooting

If product page shows "Product not found":
- Check that you're accessing `/products/1`, `/products/2`, etc.
- Product IDs must match exactly with those in products.ts

If cart won't update:
- Refresh page - cart persists via localStorage
- Check browser console for errors

If coupon won't apply:
- Verify exact spelling (case-insensitive)
- Check if minimum cart amount is met
- Try a different coupon code from the list above
