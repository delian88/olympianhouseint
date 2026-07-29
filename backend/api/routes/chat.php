<?php
/**
 * OHI Backend — AI Chat Assistant Route
 * POST /api/chat
 */

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$userMessage = trim($input['message'] ?? '');

if (empty($userMessage)) {
    http_response_code(400);
    echo json_encode(['error' => 'Message is required']);
    exit;
}

// ─── OHI Knowledge Base Fallback AI Engine ──────────────────────────────────
function getOhiAiResponse(string $msg): string {
    $m = strtolower($msg);

    if (str_contains($m, 'hello') || str_contains($m, 'hi') || str_contains($m, 'hey') || str_contains($m, 'greetings')) {
        return "Hello! Welcome to Olympian House International (OHI). I am your AI Assistant. How can I help you today? You can ask me about our development storytelling services, track record, founder, or how to get in touch.";
    }

    if (str_contains($m, 'service') || str_contains($m, 'what do you do') || str_contains($m, 'offer')) {
        return "OHI provides investment-grade visual narratives and strategic communication for development agencies, multilateral institutions, and DFIs across Africa.\n\nKey Services:\n1. **Impact Documentaries & Films** — Cinematic storytelling for donor reporting and forums.\n2. **Strategic Communication** — Brand strategy, institutional positioning & DFI compliance.\n3. **Investment Showcases** — High-impact media showcasing regional economic potential.\n4. **Media Strategy & Field Coverage** — On-the-ground visual documentation across Africa.";
    }

    if (str_contains($m, 'founder') || str_contains($m, 'banns') || str_contains($m, 'ceo') || str_contains($m, 'leadership') || str_contains($m, 'who founded')) {
        return "OHI was founded in 2015 by **Fombang Banns N.**, a visionary story-teller who believed that compelling narratives move capital and unlock development value. Under his leadership, OHI has grown into Africa's premier development storytelling firm serving global partners like WFP, EU, UNESCO, and IFRC.";
    }

    if (str_contains($m, 'client') || str_contains($m, 'partner') || str_contains($m, 'trust') || str_contains($m, 'track record') || str_contains($m, 'proof') || str_contains($m, 'experience')) {
        return "OHI has delivered over **100+ projects** across Africa with a 95% repeat-client rate. Our trusted partners include:\n- **World Food Programme (WFP)**\n- **EU Civil Protection & Humanitarian Aid**\n- **Cameroon Investment Promotion Agency (API)**\n- **IFRC**\n- **UNESCO**\n- **Olam Food Ingredients (OFI)**\n- **Sun King**";
    }

    if (str_contains($m, 'contact') || str_contains($m, 'email') || str_contains($m, 'phone') || str_contains($m, 'location') || str_contains($m, 'reach') || str_contains($m, 'address')) {
        return "You can reach the OHI team directly:\n- **Email**: contact@olympianhouseintl.com\n- **Phone**: +237 671 646 331\n- **Location**: Yaoundé, Cameroon (serving clients across Africa & globally)\n- **Form**: Visit our [Contact Page](/contact) to start a conversation.";
    }

    if (str_contains($m, 'admin') || str_contains($m, 'login') || str_contains($m, 'dashboard')) {
        return "The OHI Admin Portal allows authorized staff to edit all website content in real time. You can log in via the [Admin Login](/admin/login) page.";
    }

    if (str_contains($m, 'pricing') || str_contains($m, 'cost') || str_contains($m, 'quote') || str_contains($m, 'hire')) {
        return "Every development programme and documentary project is custom-tailored to institutional goals. Please send us your project brief at contact@olympianhouseintl.com or fill out our contact form, and our team will get back to you with a proposal.";
    }

    return "Thank you for reaching out to OHI AI Assistant! Olympian House International turns development programmes into investment-grade visual narratives.\n\nCould you clarify if you're asking about our **services**, **documentary projects**, **founder & team**, or **contact options**?";
}

// Check for OpenAI API key if configured
$openAiKey = getenv('OPENAI_API_KEY');

if (!empty($openAiKey)) {
    try {
        $ch = curl_init('https://api.openai.com/v1/chat/completions');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            "Authorization: Bearer {$openAiKey}"
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'system', 'content' => 'You are the OHI AI Assistant for Olympian House International, Africa premier development storytelling and strategic visibility firm.'],
                ['role' => 'user', 'content' => $userMessage]
            ],
            'max_tokens' => 300
        ]));
        
        $res = curl_exec($ch);
        curl_close($ch);
        $data = json_decode($res, true);
        $reply = $data['choices'][0]['message']['content'] ?? getOhiAiResponse($userMessage);

        echo json_encode(['reply' => $reply]);
        exit;
    } catch (Throwable $e) {
        // Fallback to local engine
    }
}

// Fallback to intelligent built-in OHI AI engine
$reply = getOhiAiResponse($userMessage);
echo json_encode(['reply' => $reply]);
