import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useRouter } from "next/navigation";
import React from "react";

interface PaginationGlobal {
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number
    total_pages: number
}

const PaginationGlobal: React.FC<PaginationGlobal> = ({
    page, total_pages, setPage
}) => {
    const router = useRouter()
    
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        router.push(`/alimentos?page=${newPage}`);
    };

    return (
        <>
            <Pagination className="mt-6">
                <PaginationContent>
                    <PaginationItem>
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}  >
                            <PaginationPrevious />
                        </button>

                    </PaginationItem>
                    {Array.from({ length: total_pages || 1 }, (_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                isActive={index + 1 === page}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <button onClick={() => handlePageChange(page + 1)} aria-disabled disabled={page === total_pages} >
                            <PaginationNext />
                        </button>

                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}

export default PaginationGlobal