import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input types
    const workflowId = typeof body.workflowId === "number" ? body.workflowId : parseInt(body.workflowId, 10);
    const voteType = body.voteType;

    // Strict validation
    if (!Number.isInteger(workflowId) || workflowId <= 0) {
      return NextResponse.json({ error: "Invalid workflow ID" }, { status: 400 });
    }

    if (voteType !== "up" && voteType !== "down") {
      return NextResponse.json({ error: "Invalid vote type" }, { status: 400 });
    }

    const voteChange = voteType === "up" ? 1 : -1;

    // Use Prisma transaction for atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Check if workflow exists first
      const workflow = await tx.workflow.findUnique({
        where: { id: workflowId },
      });

      if (!workflow) {
        return null;
      }

      // Update workflow votes
      const updatedWorkflow = await tx.workflow.update({
        where: { id: workflowId },
        data: {
          votes: { increment: voteChange },
        },
        select: {
          id: true,
          categoryId: true,
          idea: true,
          complexity: true,
          useCase: true,
          platforms: true,
          votes: true,
        },
      });

      // Create vote record
      await tx.vote.create({
        data: {
          workflowId,
          voteType,
        },
      });

      return updatedWorkflow;
    });

    if (!result) {
      return NextResponse.json({ error: "Workflow not found" }, { status: 404 });
    }

    // Transform response
    const workflow = {
      id: result.id,
      category_id: result.categoryId,
      idea: result.idea,
      complexity: result.complexity,
      use_case: result.useCase,
      platforms: result.platforms,
      votes: result.votes,
    };

    return NextResponse.json({ success: true, workflow });
  } catch (error) {
    console.error("Error saving vote:", error);
    return NextResponse.json({ error: "Failed to save vote" }, { status: 500 });
  }
}
