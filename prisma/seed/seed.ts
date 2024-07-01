/**
 * ! Executing this script will delete all data in your database and seed it with 10 userRole.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { v4 as uuidv4 } from 'uuid';
import { createSeedClient } from "@snaplet/seed";

const main = async () => {
  const seed = await createSeedClient();

  // // Truncate all tables in the database
  // await seed.$resetDatabase();

  // Truncate the userRoles table
  // await seed.$resetDatabase(['UserRole'])

  // await seed.userRole([
  //   { userRoleId: 'instructor' },
  //   { userRoleId: 'student' },
  //   { userRoleId: 'student_instructor' }, // Applicable when a user can be both a student
  //   { userRoleId: 'admin' } // System admins
  // ])

  // Truncate the coursecategory table
  await seed.$resetDatabase(['CourseCategory'])

  // Seed the CourseCategory table
  await seed.courseCategory([
  { category: "Science", categoryId: uuidv4() },
  { category: "Technology", categoryId: uuidv4() },
  { category: "Engineering", categoryId: uuidv4() },
  { category: "Mathematics", categoryId: uuidv4() },
  { category: "Arts", categoryId: uuidv4() },
  { category: "Humanities", categoryId: uuidv4() },
  { category: "Business", categoryId: uuidv4() },
  { category: "Finance", categoryId: uuidv4() },
  { category: "Health & Wellness", categoryId: uuidv4() },
  { category: "Language Learning", categoryId: uuidv4() },
  { category: "Computer Science", categoryId: uuidv4() },
  { category: "Data Science", categoryId: uuidv4() },
  { category: "Personal Development", categoryId: uuidv4() },
  { category: "Music", categoryId: uuidv4() },
  { category: "Photography", categoryId: uuidv4() },
  { category: "Marketing", categoryId: uuidv4() },
  { category: "Sales", categoryId: uuidv4() },
  { category: "Graphic Design", categoryId: uuidv4() },
  { category: "Web Development", categoryId: uuidv4() },
  { category: "Mobile Development", categoryId: uuidv4() },
  { category: "Cybersecurity", categoryId: uuidv4() },
  { category: "Artificial Intelligence", categoryId: uuidv4() },
  { category: "Machine Learning", categoryId: uuidv4() },
  { category: "Project Management", categoryId: uuidv4() },
  { category: "Leadership", categoryId: uuidv4() },
  { category: "Public Speaking", categoryId: uuidv4() },
  { category: "Writing", categoryId: uuidv4() },
  { category: "Psychology", categoryId: uuidv4() },
  { category: "Education", categoryId: uuidv4() },
  { category: "History", categoryId: uuidv4() },
  { category: "Philosophy", categoryId: uuidv4() },
  { category: "Sociology", categoryId: uuidv4() },
  { category: "Political Science", categoryId: uuidv4() },
  { category: "Environmental Science", categoryId: uuidv4() },
  { category: "Architecture", categoryId: uuidv4() },
  { category: "Interior Design", categoryId: uuidv4() },
  { category: "Fashion Design", categoryId: uuidv4() },
  { category: "Film & Video", categoryId: uuidv4() },
  { category: "Game Development", categoryId: uuidv4() },
  { category: "3D Modeling & Animation", categoryId: uuidv4() },
  { category: "Networking", categoryId: uuidv4() },
  { category: "DevOps", categoryId: uuidv4() },
  { category: "Cloud Computing", categoryId: uuidv4() },
  { category: "Blockchain", categoryId: uuidv4() },
  { category: "Quantum Computing", categoryId: uuidv4() },
  { category: "Robotics", categoryId: uuidv4() },
  { category: "Astronomy", categoryId: uuidv4() },
  { category: "Biology", categoryId: uuidv4() },
  { category: "Chemistry", categoryId: uuidv4() },
  { category: "Physics", categoryId: uuidv4() },
  { category: "Statistics", categoryId: uuidv4() },
  { category: "Algebra", categoryId: uuidv4() },
  { category: "Calculus", categoryId: uuidv4() },
  { category: "Geometry", categoryId: uuidv4() },
  { category: "Trigonometry", categoryId: uuidv4() },
  { category: "Economics", categoryId: uuidv4() },
  { category: "Accounting", categoryId: uuidv4() },
  { category: "Human Resources", categoryId: uuidv4() },
  { category: "Entrepreneurship", categoryId: uuidv4() },
  { category: "Supply Chain Management", categoryId: uuidv4() },
  { category: "Operations Management", categoryId: uuidv4() },
  { category: "Customer Service", categoryId: uuidv4() },
  { category: "Mental Health", categoryId: uuidv4() },
  { category: "Nutrition", categoryId: uuidv4() },
  { category: "Fitness", categoryId: uuidv4() },
  { category: "Yoga", categoryId: uuidv4() },
  { category: "Meditation", categoryId: uuidv4() },
  { category: "Culinary Arts", categoryId: uuidv4() },
  { category: "Bartending", categoryId: uuidv4() },
  { category: "Wine Tasting", categoryId: uuidv4() },
  { category: "Travel & Tourism", categoryId: uuidv4() },
  { category: "Hospitality Management", categoryId: uuidv4() },
  { category: "Event Planning", categoryId: uuidv4() },
  { category: "Real Estate", categoryId: uuidv4() },
  { category: "Personal Finance", categoryId: uuidv4() },
  { category: "Investing", categoryId: uuidv4() },
  { category: "Cryptocurrency", categoryId: uuidv4() },
  { category: "Retirement Planning", categoryId: uuidv4() },
  { category: "Insurance", categoryId: uuidv4() },
  { category: "Tax Preparation", categoryId: uuidv4() },
  { category: "Parenting", categoryId: uuidv4() },
  { category: "Relationships", categoryId: uuidv4() },
  { category: "Self-Improvement", categoryId: uuidv4() },
  { category: "Mindfulness", categoryId: uuidv4() },
  { category: "Life Coaching", categoryId: uuidv4() },
  { category: "Career Development", categoryId: uuidv4() },
  { category: "Job Search", categoryId: uuidv4() },
  { category: "Resume Writing", categoryId: uuidv4() },
  { category: "Interviewing Skills", categoryId: uuidv4() },
  { category: "Time Management", categoryId: uuidv4() },
  { category: "Stress Management", categoryId: uuidv4() },
  { category: "Conflict Resolution", categoryId: uuidv4() },
  { category: "Diversity & Inclusion", categoryId: uuidv4() }
])

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");

  process.exit();
};

main();