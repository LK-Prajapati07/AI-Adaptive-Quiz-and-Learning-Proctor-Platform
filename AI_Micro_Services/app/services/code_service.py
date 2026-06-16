import subprocess
import tempfile
import os


def code_evaluation(
    student_code: str,
    language: str,
    test_cases: list,
    marks: int
):

    passed = 0


    # currently python support
    if language.lower() != "python":

        return {
            "is_correct": False,
            "obtained_marks": 0,
            "feedback": "Language not supported"
        }


    # create temporary python file

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".py",
        mode="w"
    ) as file:

        file.write(
            student_code
        )

        file_path = file.name



    try:

        for test in test_cases:

            result = subprocess.run(

                [
                    "python",
                    file_path
                ],

                input=test["input"],

                capture_output=True,

                text=True,

                timeout=5
            )


            output = (
                result.stdout
                .strip()
            )


            expected = (
                test["output"]
                .strip()
            )


            if output == expected:

                passed += 1



        total_tests = len(
            test_cases
        )


        obtained_marks = int(
            (passed / total_tests)
            *
            marks
        )


        return {

            "is_correct":
                passed == total_tests,


            "obtained_marks":
                obtained_marks,


            "feedback":
                f"{passed}/{total_tests} test cases passed"
        }



    except Exception as e:


        return {

            "is_correct": False,

            "obtained_marks": 0,

            "feedback": str(e)
        }


    finally:

        os.remove(
            file_path
        )