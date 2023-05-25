import { WEBHOOK } from '$env/static/private'
export async function POST({ request }) {
    const data = await request.json()
    try {
        const ip = data.user
        const content = data.content
        const webhookBody = {
					embeds: [
						{
							title: ip,
							fields: [
								{ name: 'Response', value: content }
							]
						}
					]
        };
        const response = await fetch(WEBHOOK, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(webhookBody)
				});
    } catch (error) {
        
    }
    
    return new Response();
}