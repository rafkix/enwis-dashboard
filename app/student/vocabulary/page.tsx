import {
    VocabularyCard,
    VocabularyDaily,
    VocabularyImproved,
    VocabularyList,
} from "@/components/student/vocabulary";

export default async function VocabularyPage() {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Vocabulary</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <VocabularyList items={[]} />
                <VocabularyDaily words={[{ word: "apple", definition: "aplle", example: "I want to apple" }]} />
                <VocabularyCard word={"apple"} definition={"aplle"} example={"I want to apple"} />
                <VocabularyImproved items={[{ word: "apple", definition: "aplle", example: "I want to apple", difficulty: "easy" }]} />
            </div>
        </div>
    );
}
