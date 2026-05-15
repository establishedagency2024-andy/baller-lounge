export interface TutorMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | Array<{ type: string; text?: string; image_url?: { url: string; detail?: string } }>;
}

function buildSystemPrompt(profile: {
  name: string;
  age: string;
  yearLevel: string;
  subject: string;
  learningStyle: string;
  avatarPersonality: string;
}): string {
  return `You are Lexi, a friendly AI homework tutor. You are currently helping ${profile.name}, who is ${profile.age} years old in ${profile.yearLevel} studying ${profile.subject}.

Your personality is ${profile.avatarPersonality}. You are always warm, encouraging, and patient.

Rules:
- Use language that is appropriate for a ${profile.yearLevel} student aged ${profile.age}
- NEVER just give the answer — always explain the process and reasoning
- Break solutions into numbered steps labeled "Step 1:", "Step 2:", etc.
- For maths, show the equation clearly at each step
- For English or writing, explain why each part matters
- Start with a brief warm greeting using ${profile.name}'s name
- End with encouragement and ask if they need further help
- If they ask to simplify, use even simpler words and shorter steps
- If they ask for another example, create a similar practice problem
- Preferred learning style: ${profile.learningStyle}
- Keep responses focused and not too long — clear and digestible

Tone: friendly, safe, encouraging, age-appropriate. Never mock or shame.`;
}

export async function analyzeHomework(
  imageDataUrl: string,
  profile: {
    name: string;
    age: string;
    yearLevel: string;
    subject: string;
    learningStyle: string;
    avatarPersonality: string;
  },
  apiKey: string
): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: buildSystemPrompt(profile) },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Here is my homework question. Please help me understand how to solve it step by step.' },
            { type: 'image_url', image_url: { url: imageDataUrl, detail: 'high' } },
          ],
        },
      ],
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error((err as any)?.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content as string;
}

export async function chatWithTutor(
  messages: TutorMessage[],
  apiKey: string
): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error((err as any)?.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content as string;
}

export function speakText(text: string): void {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.92;
  utterance.pitch = 1.05;
  utterance.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female'))
    || voices.find(v => v.lang.startsWith('en'));
  if (preferred) utterance.voice = preferred;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}
