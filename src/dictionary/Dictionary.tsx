import { useState } from 'react'
import { useVideoMap } from '../hooks/useVideoMap'
import { SearchBar } from '../shared/search-bar/SearchBar'
import { ActiveTranslation } from '../shared/active-translation/ActiveTranslation'
import { VideoTranslation } from '../shared/video-translation/VideoTranslation'

const Dictionary = () => {
    const [currentWord, setCurrentWord] = useState<string | null>(null)
    const { videoMap } = useVideoMap()

    const handleSearch = (word: string) => {
        setCurrentWord(word)
    }

    return (
        <>
            <div className="bg-[#ffffff] text-[#292524] min-h-screen flex flex-col font-sans antialiased">

                <SearchBar onSearch={handleSearch} />

                {currentWord && (
                    <>
                        <ActiveTranslation word={currentWord} />
                        <VideoTranslation word={currentWord} videoMap={videoMap} />
                    </>
                )}
            </div>
        </>
    )

}

export default Dictionary