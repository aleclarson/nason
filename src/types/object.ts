import {Encoder} from '../index';
import {concat} from '../utils/concat';
import {pack} from '../utils/pack';
import {unpack} from '../utils/unpack';

export default <Encoder<Record<string, unknown>>>{
    test(v) {
        return typeof v === 'object';
    },

    encode(o, encode) {
        let data = new Uint8Array(0);

        for (const [key, value] of Object.entries(o)) {
            if (value !== undefined) {
                data = concat(
                    data,
                    pack(encode(key)),
                    pack(encode(value))
                );
            }
        }

        return data;
    },

    decode(source, decode) {
        const entries: Array<[string, unknown]> = [];
        let data: Uint8Array;
        let offset = 0;

        while (offset < source.length) {
            [data, offset] = unpack(source, offset);
            const str = decode(data) as string;

            [data, offset] = unpack(source, offset);
            entries.push(
                [str, decode(data)]
            );
        }

        return Object.fromEntries(entries);
    }
};

