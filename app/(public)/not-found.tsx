import { ErrorView } from "@/components/shared/ErrorView"

export default function NotFound() {
    return (
        <ErrorView 
            code="404"
            type="404"
            title="Sahifa topilmadi"
            description="Siz qidirayotgan sahifa o'chirilgan, manzili o'zgargan yoki vaqtincha mavjud emas."
        />
    )
}