// import fetch from "node-fetch";
import fetch from "cross-fetch";

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
  const response = await fetch(
    `https://recaptchaenterprise.googleapis.com/v1beta1/projects/${projectID}/assessments?key=${secretKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://blt2021.gatsbyjs.io/",
      },
      body: JSON.stringify({
        event: {
          token,
          siteKey,
          expectedAction: "LOGIN",
        },
      }),
    }
  );
  const data = await response.json();

  let valid = data?.tokenProperties?.valid ?? false;
  let score = data?.score ?? 0.0;

  let isvalid = valid && score >= 0.5;

  console.log({
    valid,
    score,
    userIp: data?.event?.userIpAddress,
  });
  if (isvalid) {
    return true;
  } else {
    return false;
  }
}
