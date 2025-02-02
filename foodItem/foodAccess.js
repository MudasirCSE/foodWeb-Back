import foodItem from "../models/foodItems.js"
import foodCategory from "../models/categories.js";
import order from "../models/userorder.js";
import userModel from "../models/user.js";


const categoryNames = async (req, res) => {
    try {
        const foods = await foodCategory.find({});
        // const categoryNames = foods.map((item) => item.categoryName)
        res.json(foods)
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
const getAllOrders = async (req, res) => {
    try {
        const userData = req.body;
        const [username, email] = userData;
        const existingUser = await userModel.findOne({ email: email })
        const allOrders = await order.find({ user_id: existingUser._id });
        res.json({ historyData: allOrders })

    } catch (error) {
        console.log(error.message)
    }
}

const myOrders = async (req, res) => {
    const data = req.body
    const userorder = data.cart;
    const info = data.data;
    // Calculate the total price based on the order items
    const totalPrice = userorder.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const newdate = new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    const [name, email] = data.user;
    const existingUser = await userModel.findOne({ email: email });

    const newOrder = new order({
        user_id: existingUser._id,
        fname: info.fname,
        email: info.email,
        street: info.street,
        state: info.state,
        country: info.country,
        mobile: info.phone,
        order: userorder.map(item => ({
            productName: item.itemName,  // Rename itemName to productName
            price: item.price,
            quantity: item.quantity,
            image: item.imgURL,
            id: item.id,
        })),
        totalPrice: totalPrice,
        date: newdate
    })
    try {
        await newOrder.save();
        // console.log("Order Saved")
        setTimeout(async () => {
            try {
                const updateStatus = await order.findByIdAndUpdate(newOrder._id, { $set: { status: "Delivered" } });
            }
            catch (error) {
                console.log(error.message)
            }
        }, 10000);

        res.json({ success: true, newlyOrder: newOrder })
    } catch (error) {
        console.log("Error Occured during saving order", error.message)
    }
}

const sendList = async (req,res) => {
        try {
            // const Deserts = req.body.special;
            // const FastFood = req.body
            const deserts = req.body.deserts;
            console.log(deserts)
            // console.log(FastFood)
            // console.log(SpecialDishes)
            res.json({ success: true, message: "Successfuly get" })
            for (let food of deserts) {
                const categoryDoc = await foodCategory.findOne({ categoryName: 'Deserts' });
                if (!categoryDoc) {
                    return res.status(400).json({ success: false, message: `Category "${categoryName}" not found` });
                }
                // Remove 'Pkr' and convert the price to a number
                const price = parseInt(food.price.replace(' Pkr', '').trim());
                const newfood = new foodItem({
                    itemName: food.name,
                    imgURL: food.img,
                    price: price,
                    category: categoryDoc._id
                })
                // await newfood.save();
                // console.log("Foods", food)
            }
        }
        catch (error) {
            console.log(error.message)
        }
}

const itemDetails = async (req,res) => {
    try {
        const foodList = await foodItem.find({});
        res.json(foodList); // Send back the data
    } catch (err) {
        console.error(err);  // Log error on the server
        res.status(500).json({ error: "Failed to fetch food items" }); // Respond with a proper error message
    }
}



export { categoryNames, getAllOrders, myOrders,sendList,itemDetails }


