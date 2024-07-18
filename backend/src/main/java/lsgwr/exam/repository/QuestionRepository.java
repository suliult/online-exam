package lsgwr.exam.repository;

import lsgwr.exam.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, String> {
    /**
     * 根据问题类型ID查找问题列表。
     *
     * @param id 问题类型ID。
     * @return 指定类型的问题列表。
     */
    List<Question> findByQuestionTypeId(Integer id);
    /**
     * 查找所有问题，并按照更新时间倒序排列。
     *
     * @return 按更新时间倒序排列的问题列表。
     */
    @Query("select q from Question q order by q.updateTime desc")
    List<Question> findAll();
}
