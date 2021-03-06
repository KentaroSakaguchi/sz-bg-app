import formidable from 'formidable';
import fs from 'fs';
import sharp from 'sharp'

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  console.log(req)
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    await saveFile(files.file);
    return res.status(201).send("");
  });
};

const saveFile = async (file) => {
  // const buffer = Buffer.from(file);
  // console.log(buffer)
  // console.log(file)
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/${file.originalFilename}`, data);
  await fs.unlinkSync(file.filepath);
  sharp(`./public/${file.originalFilename}`)
    .rotate()
    .webp({
      quality: 80
    })
    .toFile(`./public/output.webp`, (err, info) => {

    });
  return;
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};
