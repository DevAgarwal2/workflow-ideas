import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import workflowsData from '../workflows.json';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const categories = [
  { id: "when-then", name: "When-Then", color: "#3b82f6" },
  { id: "human-gate", name: "Human-Gate", color: "#f59e0b" },
  { id: "self-heal", name: "Self-Heal", color: "#10b981" },
  { id: "smart-context", name: "Smart-Context", color: "#8b5cf6" },
  { id: "domino", name: "Domino", color: "#ef4444" },
  { id: "bridge", name: "Bridge", color: "#06b6d4" },
  { id: "clockwork", name: "Clockwork", color: "#f97316" },
  { id: "instant-react", name: "Instant-React", color: "#ec4899" },
  { id: "shape-shift", name: "Shape-Shift", color: "#84cc16" },
  { id: "content-machine", name: "Content-Machine", color: "#6366f1" },
  { id: "watchdog", name: "Watchdog", color: "#dc2626" },
  { id: "swarm", name: "Swarm", color: "#0891b2" },
];

async function main() {
  console.log('🌱 Seeding database with 1000 workflow ideas...');
  console.log(`Found ${workflowsData.workflows.length} workflows to import`);

  // Clear existing workflows first
  console.log('Clearing existing workflows...');
  const deleted = await prisma.workflow.deleteMany({});
  console.log(`✅ Deleted ${deleted.count} existing workflows`);

  // Create categories
  console.log('Creating categories...');
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: {},
      create: cat,
    });
  }
  console.log(`✅ Created ${categories.length} categories`);

  // Create workflows
  console.log('Importing workflows...');
  let count = 0;
  for (const workflow of workflowsData.workflows) {
    try {
      await prisma.workflow.create({
        data: {
          idea: workflow.idea,
          complexity: workflow.complexity,
          useCase: workflow.use_case,
          platforms: JSON.stringify(workflow.platforms),
          votes: workflow.votes,
          categoryId: workflow.category_id,
        },
      });
      count++;
      if (count % 100 === 0) {
        console.log(`  Progress: ${count}/${workflowsData.workflows.length}`);
      }
    } catch (error) {
      // Skip duplicates
      if ((error as any).code !== 'P2002') {
        console.error(`Error:`, error);
      }
    }
  }
  console.log(`✅ Imported ${count} workflows`);
  console.log('🎉 Done!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
