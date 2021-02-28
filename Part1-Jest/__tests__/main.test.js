const formatVolumeIconPath = require("../assets/scripts/main")

describe('iconLevel set correctly', () => {
    test('high volume', () => {
        for(let i = 67; i <= 100; ++i){
            expect(formatVolumeIconPath(i)).toMatch('./assets/media/icons/volume-level-3.svg')
        }
    })
    test('medium-high volume', () => {
        for(let i = 34; i <= 66; ++i){
            expect(formatVolumeIconPath(i)).toMatch('./assets/media/icons/volume-level-2.svg')
        }
    })
    test('medium-low volume', () => {
        for(let i = 1; i <= 33; ++i){
            expect(formatVolumeIconPath(i)).toMatch('./assets/media/icons/volume-level-1.svg')
        }
    })
    test('mute', () => {
        expect(formatVolumeIconPath(0)).toMatch('./assets/media/icons/volume-level-0.svg')
    })
})