const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const restaurantSchema = new mongoose.Schema({
	restaurantName: {
		type: String,
		required: [true, "Company Name is required"],
		unique: [true, "Company Name Already Exists"],
	},
	phone: {
		type: String,
		required: [true, "Restaurant phone number required"],
		min: [12, "Too Few. Not valid number. Eg. 251-XXX-XXXXXX"],
		max: [12, "Too long. Not valid number. Eg. 251-XXX-XXXXXX"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		trim: true,
		lowercase: true,
		unique: [true, "Email already exists"],
	},
	location: {
		type: String,
		required: [true, "Location can't be blank"],
	},
	link: {
		type: String,
	},
	description: {
		type: String,
		required: [true, "description can't be blank"],
	},
});

const dishSchema = new mongoose.Schema({
    name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 45,
		trim: true
    },
    desciption: {
		type: String,
		maxlength: 500,
		trim: true
    },
    price: {
		type: Number,
		min: 0,
		max: 10000000
    },
	restaurant: {
		type: Schema.Types.ObjectId,
		ref: "Restaurant"
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category"
	}
});


const categorySchema = new mongoose.Schema({
    name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 45,
		trim: true
    },
});


const userSchema = mongoose.Schema(
	{
	  name: {
		type: String,
		required: true,
	  },
	  email: {
		type: String,
		required: true,
		unique: true,
	  },
	  password: {
		type: String,
		required: function () {
		  return !this.facebookId && !this.googleId; // Password is required if not using OAuth
		},
	  },
	  facebookId: {
		type: String,
		default: null, // For Facebook OAuth users
	  },
	  googleId: {
		type: String,
		default: null, // For Google OAuth users
	  },
	  tokens: [
		{
		  token: {
			type: String,
		  },
		},
	  ],
	},
	{
	  timestamps: true,
	}
  );



// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
if (!this.isModified('password')) {
	next();
}

const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
});

// Export all models in a single object
const models = {
    User: mongoose.model('User', userSchema),
    Restaurant: mongoose.model('Restaurant', restaurantSchema),
    Category: mongoose.model('Category', categorySchema),
    Dish: mongoose.model('Dish', dishSchema),
};

module.exports = models;