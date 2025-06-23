self.__uv$config = {
  prefix: '/gova-search/uv/', // 👈 Change this to your repo name!
  bare: 'https://itzgabedev.github.io/gova-search/', // 👈 Temporary public bare server
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
};
