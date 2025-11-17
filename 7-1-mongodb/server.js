import mongoose from "mongoose";

// ===== establish connection =====
const MONGODB_URI = "mongodb+srv://s202322770_db_user:NchevqJ7opXv4EQ@cluster0.6jk9cfu.mongodb.net/";


async function connect() {
  await mongoose.connect(MONGODB_URI, { dbName: "test" });
  console.log("Connected");
}

// ===== define schema =====
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  major: String,
});
const Student = mongoose.model("Student", studentSchema);

// ===== create document =====
async function createStudents() {
  await Student.insertMany([
    { name: "Ali", age: 21, major: "CS" },
    { name: "Sara", age: 23, major: "SE" },
  ]);
  console.log("✅ Inserted");
}

// ===== read document =====
async function readStudents() {
  const all = await Student.find();
  console.log(all);
}

// ===== update document =====
async function updateStudent() {
  await Student.updateOne({ name: "Ali" }, { age: 22 });
  console.log("✅ Updated Ali");
}

// ===== delete document =====
async function deleteStudent() {
  await Student.deleteOne({ name: "Sara" });
  console.log("✅ Deleted Sara");
}

(async () => {
  try {
    await connect();

    
    // 1) Create:
    await createStudents();

    // 2) Read:
    await readStudents();

    // 3) Update:
     await updateStudent();

    // 4) Delete:
    await deleteStudent();

    
    await readStudents();
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
})();