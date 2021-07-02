// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const res2 = await fetch("https://ipwhois.app/json/");
  const data = await res2.json();

  const ip = req.socket.localAddress;


  res.statusCode = 200
  res.json({ data, ip })
}
