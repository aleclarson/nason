import {Encoder, SerializableValue} from '../index';
import {concat} from '../utils/concat';
import {pack} from '../utils/pack';
import {unpack} from '../utils/unpack';
import integer from './integer';

export default {
    test: Array.isArray,

    encode(a: Array<SerializableValue>, encode): Uint8Array {
        let data = pack(integer.encode(a.length));

        for (const val of a) {
            data = concat(
                data,
                pack(encode(val))
            );
        }

        return data;
    },

    decode(a: Uint8Array, decode): Array<SerializableValue> {
        const [array, newOffset] = unpack(a);
        const size = integer.decode(array);
        const res = [];

        let data: Uint8Array;
        let offset = newOffset;
        for (let i = 0; i < size; i++) {
            [data, offset] = unpack(a, offset);
            res.push(decode(data));
        }

        return res;
    }
} as Encoder<Array<SerializableValue>>;
