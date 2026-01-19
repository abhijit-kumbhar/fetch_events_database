const bcrypt = require("bcryptjs");
const guestService = require("../services/guest.service");
const { CompactEncrypt } = require("jose");
const crypto = require("crypto");
require("dotenv").config();


const encoder = new TextEncoder();

/**
 * REGISTER
 */
const registerGuest = async (req, res, next) => {
    try {
        const {
            guest_name,
            guest_dob,
            guest_gender,
            guest_mobile,
            guest_email,
            password
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await guestService.registerGuest({
            guest_name,
            guest_dob,
            guest_gender,
            guest_mobile,
            guest_email,
            password: hashedPassword
        });

        if (!result.success) {
            return res.status(409).json({
                success: false,
                message:
                    result.reason === "MOBILE_EXISTS"
                        ? "Mobile number already registered"
                        : "Email already registered"
            });
        }

        res.status(201).json({
            success: true,
            message: "Registration successful",
            guest_id: result.guest_id
        });
    } catch (err) {
        next(err);
    }
};

/**
 * LOGIN
 */
const loginGuest = async (req, res, next) => {
    try {
        const { guest_mobile, password } = req.body;

        const guest = await guestService.loginGuest(guest_mobile);
        if (!guest) {
            return res.status(404).json({
                success: false,
                message: "Mobile number not registered"
            });
        }

        const isMatch = await bcrypt.compare(password, guest.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        const payload = JSON.stringify({
            guest_id: guest.guest_id,
            guest_mobile: guest.guest_mobile
        });

        const secretString = process.env.JWT_SECRET;
        if (!secretString) {
            throw new Error("JWT_SECRET is not defined in environment variables!");
        }

        const secret = crypto.createHash("sha256").update(secretString).digest();


        const token = await new CompactEncrypt(encoder.encode(payload))
            .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
            .encrypt(secret);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            guest: {
                guest_id: guest.guest_id,
                guest_name: guest.guest_name,
                guest_mobile: guest.guest_mobile,
                guest_email: guest.guest_email
            }
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { registerGuest, loginGuest };
