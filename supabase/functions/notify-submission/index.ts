import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { title, authorName, authorEmail, mood, content } = await req.json()

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'The Akshansh Experience <onboarding@resend.dev>',
        to: 'theakshanshexperience@gmail.com',
        subject: `New submission: "${title}" by ${authorName}`,
        html: `
          <div style="font-family: Georgia, serif; padding: 32px; background: #0f131d; color: #dfe2f0; border-radius: 8px;">
            <h2 style="color: #c4d4f5; margin-top: 0;">${title}</h2>
            <p><strong>Author:</strong> ${authorName} (${authorEmail})</p>
            <p><strong>Mood:</strong> ${Array.isArray(mood) ? mood.join(', ') : mood}</p>
            <hr style="border: 0; border-top: 1px solid #44474d; margin: 20px 0;" />
            <pre style="font-family: Georgia; line-height: 1.8; color: #8892aa; white-space: pre-wrap;">${content.slice(0, 500)}...</pre>
            <div style="margin-top: 24px;">
              <a href="https://the-akshansh-experience.vercel.app/admin.html" style="color: #c4d4f5; text-decoration: none; font-weight: bold;">Review in Admin →</a>
            </div>
          </div>
        `
      })
    })

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text()
      throw new Error(`Resend API error: ${errorText}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400
    })
  }
})