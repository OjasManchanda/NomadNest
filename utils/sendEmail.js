const nodemailer = require('nodemailer');

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send booking confirmation email
async function sendBookingEmail(userEmail, booking, listing) {
    try {
        // Format dates to be human-readable
        const checkInDate = new Date(booking.checkInDate).toDateString(); // e.g., "Mon Apr 29 2026"
        const checkOutDate = new Date(booking.checkOutDate).toDateString();
        
        // Get property image URL (use default if not available)
        const propertyImage = listing.image?.url || 'https://via.placeholder.com/600x400?text=Property+Image';
        
        // Format price with Indian Rupee symbol
        const totalPrice = `₹${booking.totalPrice.toLocaleString('en-IN')}`;
        
        // Create travel instructions based on location
        const travelInstructions = `
            <p><strong>📍 Location:</strong> ${listing.location}, ${listing.country}</p>
            <p><strong>🗺️ How to Reach:</strong></p>
            <ul>
                <li>Search for "${listing.location}, ${listing.country}" on Google Maps</li>
                <li>The property is located in ${listing.location}</li>
                <li>We recommend booking a taxi or using local transportation</li>
                <li>Contact the host for detailed directions: ${listing.owner?.username || 'Host'}</li>
            </ul>
        `;
        
        // HTML Email Template
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #ff385c 0%, #e31c5f 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 30px 20px;
        }
        .success-badge {
            background-color: #10b981;
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            display: inline-block;
            font-weight: 600;
            margin-bottom: 20px;
        }
        .property-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 8px;
            margin: 20px 0;
        }
        .property-title {
            font-size: 24px;
            font-weight: 600;
            color: #222;
            margin: 15px 0;
        }
        .booking-details {
            background-color: #f9fafb;
            border-left: 4px solid #ff385c;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .booking-details h3 {
            margin-top: 0;
            color: #ff385c;
            font-size: 18px;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #555;
        }
        .detail-value {
            color: #222;
        }
        .total-price {
            font-size: 24px;
            font-weight: 700;
            color: #ff385c;
        }
        .divider {
            height: 2px;
            background: linear-gradient(to right, #ff385c, #e31c5f);
            margin: 30px 0;
        }
        .travel-section {
            background-color: #fef3f2;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .travel-section h3 {
            color: #ff385c;
            margin-top: 0;
        }
        .travel-section ul {
            padding-left: 20px;
        }
        .travel-section li {
            margin: 8px 0;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #ff385c 0%, #e31c5f 100%);
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
        }
        .footer p {
            margin: 5px 0;
        }
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            .content {
                padding: 20px 15px;
            }
            .property-title {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>🏡 WANDERLUST</h1>
            <p>Your Adventure Awaits</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="success-badge">
                ✅ Booking Confirmed!
            </div>
            
            <p>Great news! Your booking has been confirmed. Get ready for an amazing stay!</p>
            
            <!-- Property Image -->
            <img src="${propertyImage}" alt="${listing.title}" class="property-image">
            
            <!-- Property Title -->
            <div class="property-title">${listing.title}</div>
            
            <!-- Booking Details -->
            <div class="booking-details">
                <h3>📋 Booking Details</h3>
                
                <div class="detail-row">
                    <span class="detail-label">Booking ID:</span>
                    <span class="detail-value">#${booking._id.toString().slice(-8).toUpperCase()}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">📅 Check-in:</span>
                    <span class="detail-value">${checkInDate}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">📅 Check-out:</span>
                    <span class="detail-value">${checkOutDate}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">🌙 Nights:</span>
                    <span class="detail-value">${booking.numberOfNights}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">👥 Guests:</span>
                    <span class="detail-value">${booking.guests}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">📍 Location:</span>
                    <span class="detail-value">${listing.location}, ${listing.country}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">💰 Total Price:</span>
                    <span class="detail-value total-price">${totalPrice}</span>
                </div>
            </div>
            
            <!-- Divider -->
            <div class="divider"></div>
            
            <!-- Travel Instructions -->
            <div class="travel-section">
                <h3>🗺️ How to Reach</h3>
                ${travelInstructions}
            </div>
            
            <!-- Additional Info -->
            <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;"><strong>💡 Pro Tip:</strong> Save this email for easy access to your booking details. Contact your host if you need any assistance!</p>
            </div>
            
            <p style="text-align: center; margin-top: 30px;">
                <strong>Questions?</strong> Contact us at support@wanderlust.com
            </p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p><strong>WanderLust</strong> - Your Home Away From Home</p>
            <p>© 2026 WanderLust. All rights reserved.</p>
            <p style="font-size: 12px; margin-top: 10px;">
                This is an automated email. Please do not reply to this message.
            </p>
        </div>
    </div>
</body>
</html>
        `;
        
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: userEmail,
            subject: `🎉 Booking Confirmed - ${listing.title}`,
            html: htmlContent
        };
        
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Booking confirmation email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
        
    } catch (error) {
        // Log error but don't throw - we don't want to break the booking flow
        console.error('❌ Error sending booking confirmation email:', error.message);
        return { success: false, error: error.message };
    }
}

module.exports = { sendBookingEmail };
