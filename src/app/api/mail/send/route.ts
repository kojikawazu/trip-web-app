import { NextResponse } from "next/server";
import Mailjet from "node-mailjet";

const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY,
    apiSecret: process.env.MAILJET_SECRET_KEY
});

// 許可するオリジンのリスト
const allowedOrigins = [
    process.env.ORIGIN_DOMAIN_L,
    process.env.ORIGIN_DOMAIN_WEB,
];

export async function POST(
    request: Request,
    response: Response
) {
    const origin = request.headers.get("origin") || '';

    // オリジンが許可されているかチェック
    if (!allowedOrigins.includes(origin)) {
        // 許可されていないオリジンからのリクエストの場合
        return new Response(JSON.stringify({ message: "Forbidden" }), {
            status: 403,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    // -------------------------------------------------------------------
    // オリジン許可

    const { name, email, messages } = await request.json();

    try {
        const response = await mailjet
            .post("send", { version: 'v3.1' })
            .request({
                Messages: [{
                    From: {
                        Email: process.env.MAILJET_FROM_EMAIL,
                        Name: name
                    },
                    To: [{
                        Email: process.env.MAILJET_FROM_TO,
                        Name: "Recipient"
                    }],
                    Subject: `${email}からメールです`,
                    TextPart: messages,
                }]
            });

        //console.log(response.body);
        return new Response(JSON.stringify({ messages: "successed" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': origin, // 許可するオリジン
            }
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify(err), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}