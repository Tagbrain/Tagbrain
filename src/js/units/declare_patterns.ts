export let patterns = {
    invisible_char: '︀',
    pattern_tag: '#[\\p{L}_0-9]*',
    pattern_L_attach: '@[\\p{L}_0-9]*',
    word: /(\w+)*/gu,
    pattern_symbols: /↓|→|←|↑|〇/gui,
    code_pattern: /(\[code\][^]*\[\/code\])/gm,
    clean_codetag_pattern: /\[(|\/)code\]/gm,
}