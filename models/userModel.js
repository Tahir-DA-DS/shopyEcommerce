const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      unique: false,
      index: true,
    },
    lastname: {
      type: String,
      required: true,
      unique: false,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    isblocked: { type: Boolean, default: false },
    cart: {
      type: Array,
      default: [],
    },
    address: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResestToken: String,
    passwordResestExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResestToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
    this.passwordResestExpires = Date.now() * 30 * 60 * 100 // 10 minutes
    return resettoken
};
//Export the model
module.exports = mongoose.model("User", userSchema);
