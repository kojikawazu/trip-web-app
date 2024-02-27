import { NextResponse } from "next/server";
import Mailjet from "node-mailjet";

const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY,
    apiSecret: process.env.MAILJET_SECRET_KEY
});

export async function POST(
    request: Request,
    response: Response
) {
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
        return NextResponse.json({ messages: "successed" });
    } catch (err) {
        console.error(err);
        return NextResponse.json(err);
    }
}