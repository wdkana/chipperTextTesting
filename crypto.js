const input = require("prompt");
const colors = require("@colors/colors/safe");
input.message = colors.rainbow("CryptoTest:");
input.delimiter = colors.green("->");

const alfabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const convert = (isi, sandi) => {
    let pecahPesan = [...isi];
    let urutanList = [];
    let urutanKeHuruf = [];

    pecahPesan.map((pesan) => {
        let urutan = alfabet.indexOf(pesan);
        const totalUrutan = urutan + parseInt(sandi);
        if (totalUrutan > alfabet.length) {
            return urutanList.push(totalUrutan - alfabet.length);
        } else {
            return urutanList.push(totalUrutan);
        }
    });

    urutanList.map((list) => {
        let urutan = list,
            alphabetLengthFromZero = alfabet.length - 1;

        // jikalau dia lebih dari 25
        if (list > alphabetLengthFromZero) {
            console.log("masuk");

            const multiply = Math.floor(list / alphabetLengthFromZero); // misal Math.floor(26 / 25) == 1
            urutan = list - alphabetLengthFromZero * multiply - 1; // (26 - 25 * 1) - 1 == 0
        }

        /*
        
          penjelasan: jikalau lebih dari dari length alphabet maka dia start dari 0
                      midal jikalau sudah 26 maka hasil nya == 0 / a << alfabetnya
                      jadi setiap lebih dari 26 > 52 dan seterusnya ... akan dimulai dari 0

        */

        return urutanKeHuruf.push(alfabet[urutan]);
    });

    const encrypt = urutanKeHuruf.join("");
    return encrypt;
};

const main = () => {
    console.log("running input ...");
    input.start();
    input.get(["pengirim", "tujuan", "isi", "sandi"], (err, result) => {
        if (err) return err;
        const data = {
            pengirim: result.pengirim,
            tujuan: result.tujuan,
            isi: result.isi,
            sandi: result.sandi,
        };
        const { pengirim, tujuan, isi, sandi } = data;
        const encryptedText = convert(data.isi, data.sandi);
        console.log(`pesan dikirim dari ${pengirim} kepada ${tujuan}, pesan originalnya adalah '${isi}' telah di encrypt menggunakan sandi ${sandi}:\n`);
        console.log("encrypted message with chipper method: \n", encryptedText);
    });
};

main();
