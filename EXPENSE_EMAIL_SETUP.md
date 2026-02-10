# Expense Form Email Setup Instructions

## Quick Setup (5 minutes)

The expense form is ready to send emails to **bharatwarriors2024@gmail.com**, but you need to complete this one-time setup:

### Step 1: Sign up for Formspree (Free)
1. Go to https://formspree.io/
2. Click "Get Started" and create a free account
3. Use your email: bharatwarriors2024@gmail.com

### Step 2: Create a Form
1. After logging in, click "New Form"
2. Name it "Expense Reimbursements"
3. Copy the Form Endpoint URL (looks like: `https://formspree.io/f/xxxxxxxx`)

### Step 3: Update the Website
1. Open `expenses.html`
2. Find line with: `const FORMSPREE_ENDPOINT = 'YOUR_FORMSPREE_ENDPOINT_HERE';`
3. Replace `YOUR_FORMSPREE_ENDPOINT_HERE` with your actual endpoint URL
4. Save, commit, and push to GitHub

### That's it! 
Now whenever someone submits an expense request, you'll receive an email at bharatwarriors2024@gmail.com with all the details.

---

## Alternative: EmailJS Setup (if you prefer more customization)

See expenses.html comments for EmailJS setup instructions.
