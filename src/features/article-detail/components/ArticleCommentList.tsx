import type { Comment } from "@/features/articles/types";

type Props = {
  comments?: Comment[] | [];
};

const ArticleCommentList = ({ comments }: Props) => {
  return (
    <div className="space-y-2">
        <h3 className="font-extrabold text-lg">Komentar Lainnya</h3>
      <div>
        {!!comments?.length && comments?.length > 0 ? (

          comments?.map((comment) => (
            <div key={comment.id}>
              <div className="py-2 border-b text-sm">{comment.content}</div>
            </div>
          ))
        ) : (
          <p className="text-sm">Belum ada Komentar</p>
        )}
      </div>
    </div>
  );
};

export default ArticleCommentList;
