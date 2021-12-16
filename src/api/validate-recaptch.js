import axios from "axios";
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
  const { data } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
  );
  return data?.success ?? false;
  //return false;
}
