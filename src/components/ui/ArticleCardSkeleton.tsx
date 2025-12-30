import { Skeleton } from "./Skeleton";

export const ArticleCardSkeleton = () => (
  <div className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col">
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="p-6 flex-1 flex flex-col space-y-4">
      <div className="flex space-x-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
      <Skeleton className="h-16 w-full flex-1" />
      
      <div className="flex gap-2">
         <Skeleton className="h-5 w-12" />
         <Skeleton className="h-5 w-16" />
         <Skeleton className="h-5 w-10" />
      </div>
      
      <div className="flex items-center pt-4 border-t border-border mt-auto">
        <Skeleton className="h-8 w-8 rounded-full mr-3" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  </div>
);
