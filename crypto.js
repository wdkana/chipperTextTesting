const input = require("prompt");
const colors = require("@colors/colors/safe");

input.message = colors.rainbow("CyptoTest:");
input.delimiter = colors.green("->");

const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];

const convert = (isi, sandi, action) => {
  let urutanList = [];
  let pecahPesan = [...isi];
  let urutanKeHuruf = [];
  let lengthAlpha = alphabet.length;

  if (sandi > 26) {
    sandi = (sandi - lengthAlpha) % lengthAlpha;
  }

  pecahPesan.map((pesan) => {
    let indexAlpha;
    let indexPilihan;

    if (action === "dec") {
      // dec for decrypt
      indexAlpha = alphabet.indexOf(pesan) - parseInt(sandi) + 1;
    } else {
      // enc for encrypt
      indexAlpha = parseInt(sandi) + alphabet.indexOf(pesan) + 1;
    }

    if (indexAlpha > 26) {
      indexPilihan = indexAlpha - lengthAlpha;
    } else {
      indexPilihan = indexAlpha;
    }

    urutanList.push(indexPilihan);
  });

  urutanList.map((urutan) => {
    urutanKeHuruf.push(alphabet[urutan - 1]);
  });

  return urutanKeHuruf.join("");
};

const main = () => {
  input.start();
  input.get(["pengirim", "tujuan", "isi", "sandi"], (err, result) => {
    const { pengirim, tujuan, isi, sandi } = result;

    const encryptText = convert(isi, sandi, "enc");
    const dencryptText = convert(encryptText, sandi, "dec");

    console.log(
      `pesan dikirim dari ${pengirim} kepada ${tujuan}, pesan originalnya adalah '${isi}' telah di encrypt menggunakan sandi ${sandi}:\n`
    );
    console.log("encrypted message with chipper method: ", encryptText);
    console.log("dencrypt message with dencrypter method: ", dencryptText);
  });
};

main();
