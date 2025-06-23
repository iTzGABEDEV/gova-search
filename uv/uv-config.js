self.__uv$config = {
    prefix: '/gova-search/uv/service/',
    bare: 'https://bare.benrogo.net/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/gova-search/uv/uv.handler.js',
    bundle: '/gova-search/uv/uv.bundle.js',
    config: '/gova-search/uv/uv.config.js',
    sw: '/gova-search/uv/uv.sw.js',
};
