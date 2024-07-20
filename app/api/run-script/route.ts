import g from "@/lib/gptScriptInstance";
import { RunEventType, RunOpts } from "@gptscript-ai/gptscript";
import { NextRequest, NextResponse } from "next/server";

const script = "app/api/run-script/story-book.gpt";

export async function POST(request: NextRequest) {
  const { story, pages, path } = await request.json();

  // Options we provide to GPTScript
  const opts: RunOpts = {
    disableCache: true,
    BaseURL: "http://127.0.0.1:11434/v1",
    // Example CLI Command: gptscript ./story-book.gpt --story "A robot and human become friends" --pages 5 --path ./stories
    input: `--story ${story} --pages ${pages} --path ${path}`,
  };

  try {
    // For Streaming response from GPTScript Endpoint and generating a data stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const run = await g.run(script, opts);

          run.on(RunEventType.Event, (data) => {
            controller.enqueue(
              encoder.encode(`event: ${JSON.stringify(data)}\n\n`)
            );
          });

          await run.text();
          controller.close();
        } catch (error) {
          controller.error(error);
          console.error("Error", error);
        }
      },
    });

    // To make sure the frontend knows we are streaming so that it keeps the connection alive
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
