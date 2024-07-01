const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 charcters" })
    .max(255, { message: "Name must be less than 255 characters" }),

  email: z
    .string({ required_error: "Email  is required" })
    .trim()
    .email({ message: "Invalid email" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "password must be atleast 7 characters" })
    .max(1024, { message: "password must be less than 1024 characters" }),
});

// validator function for this zod schema
const validate = (schema) => async (req, res, next) => {
  try {
    const parsedbody = await schema.parseAsync(req.body);
    req.body = parsedbody;
    next();
  } catch (err) {
    const message = err.errors[0].message;
    res.status(400).json({ message });
  }
};

// export them
module.exports = { validate, signupSchema };
