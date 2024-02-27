import { ALLOWED_ORIGINS } from "@/app/utils/constants";
import Mailjet from "node-mailjet";

const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY,
    apiSecret: process.env.MAILJET_SECRET_KEY
});

/**
 * メール送信
 * @param request 
 * @param response 
 * @returns 
 */
export async function POST(
    request: Request,
    response: Response
) {
    const origin = request.headers.get("origin") || '';

    // オリジンが許可されているかチェック
    if (!ALLOWED_ORIGINS.includes(origin)) {
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
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}