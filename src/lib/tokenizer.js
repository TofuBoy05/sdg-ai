import { encode } from 'gpt-3-encoder'

export function getTokens(input) {
    const tokens = encode(input)
    return tokens.length
} 