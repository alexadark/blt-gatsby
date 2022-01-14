import fetch from "node-fetch";

export default async function handler(req, res) {
  const formData = req.body;
  const human = await validateHuman(formData.rToken);
  if (!human) {
    res.status(400);
    res.json({ error: "Please, you're not fooling us, bot." });
    return;
  }

  res.status(200).json({ message: "Success!" });
}

async function validateHuman(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const siteKey = process.env.GATSBY_RECAPTCHA_SITE_KEY;
  const projectID = "bucket-list-with-1520349505342";
  console.log(token);
  const response = await fetch(
    `https://recaptchaenterprise.googleapis.com/v1beta1/projects/${projectID}/assessments?key=${secretKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: {
          token,
          siteKey,
        },
      }),
    }
  );
  const data = await response.json();
  console.log(data);

  return false;
}
