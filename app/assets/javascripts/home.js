// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var SS = SS || {};

SS.Home = function() {
 this.initialize();
}

SS.Home.prototype = {
 initialize: function () {
    // alert("Hello");
    
   this.linkclickevent();
 },
	linkclickevent: function()
	{
		
        $('#divIndex #dv_index #menu_school').click(function () {
              
              $('#divIndex').addClass('hidden');
              $('#dvSchool').removeClass('hidden');
              var schoolIndex=new SS.schoolIndex();
              
        });
        $('#dvSchool #dvChildSchool #createSchool').click(function(){
        	  $('#dvSchool').addClass('hidden');
            $('#newSchoolContainer').removeClass('hidden');
            var schoolIndex=new SS.schoolIndex();
        });
        $('#newSchoolContainer #saveSchool').click(function(){
        	$('#newSchoolContainer').addClass('hidden');
            $('#dvSchool').removeClass('hidden');
            var schoolIndex=new SS.schoolIndex();
        });

        $('#editSchoolContainer #editForm #btneditSchool').click(function(){
          $('#editSchoolContainer').addClass('hidden');
            $('#dvshowSchool').removeClass('hidden');
            var schoolIndex=new SS.schoolIndex();
        });

        $('#dvshowSchool #schoolDetails #destroySchool').click(function(){
          $('#dvshowSchool').addClass('hidden');
          $('#dvSchool').removeClass('hidden');
           var schoolIndex=new SS.schoolIndex();

        });


        $('#dvSchool #dvChildSchool #allSubject').click(function(){
          $('#dvSchool').addClass('hidden');
            $('#allSubjectContainer').removeClass('hidden');
            var subjectIndex=new SS.subjectIndex();
        });

        $('#newSchoolContainer #saveSchool').click(function(){
          $('#subjectContainer').addClass('hidden');
            $('#allSubjectContainer').removeClass('hidden');
            var subjectIndex=new SS.subjectIndex();
        });

        $('#allSubjectContainer #createSubject').click(function(){
          $('#allSubjectContainer').addClass('hidden');
            $('#subjectContainer').removeClass('hidden');
            var subjectIndex=new SS.subjectIndex();
        });
        $('#createClassroomContainer #createClassForm #btnCreateClass').click(function(){
          $('#createClassroomContainer').addClass('hidden');
            // $('#allSubjectContainer').removeClass('hidden');
            var classroomIndex=new SS.classroomIndex();
        });
        $('#allClassroom #createClassroom').click(function(){
          $('#allClassroom').addClass('hidden');
          $('#createClassroomContainer').removeClass('hidden');
            var classroomIndex=new SS.classroomIndex();
        });
        $('#allTeacher #createTeacher').click(function(){
          $('#allTeacher').addClass('hidden');
          $('#createTeacherContainer').removeClass('hidden');
            var schoolIndex=new SS.schoolIndex();
        });
        $('#createTeacherContainer #createTeacherForm #btnCreateTeacher').click(function(){
          $('#createTeacherContainer').addClass('hidden');
         $('#allTeacher').removeClass('hidden');
            var teacherIndex=new SS.teacherIndex();
        });
         $('#editTeacherContainer #editTeacherForm #btnEditTeacher').click(function(){
          $('#createTeacherContainer').addClass('hidden');
          $('#allTeacher').removeClass('hidden');
            var teacherIndex=new SS.teacherIndex();
        });
        $('#allStudent #createStudent').click(function(){
            $('#allStudent').addClass('hidden');
            $('#createStudentContainer').removeClass('hidden');
            var studentIndex=new SS.studentIndex();
        });
        //  $('#editTeacherContainer #editTeacherForm #btnEditTeacher').click(function(){
        //   $('#createTeacherContainer').addClass('hidden');
        //  $('#allTeacher').removeClass('hidden');
        //     var teacherIndex=new SS.teacherIndex();
        // });
        $('#allStudent #backClass').click(function(){
            $('#allStudent').addClass('hidden');
            $('#allClassroom').removeClass('hidden');
            var classroomIndex=new SS.classroomIndex();
        });
        $('#createStudentContainer #createStudentForm #cancel').click(function(){
            $('#createStudentContainer').addClass('hidden');
            $('#allStudent').removeClass('hidden');
            var studentIndex=new SS.studentIndex();
        });
        $('#editStudentContainer #editStudentForm #cancel').click(function(){
            $('#editStudentContainer').addClass('hidden');
            $('#allStudent').removeClass('hidden');
            var studentIndex=new SS.studentIndex();
        });
        $('#editTeacherContainer #editTeacherForm #cancel').click(function(){
            $('#editTeacherContainer').addClass('hidden');
            $('#allTeacher').removeClass('hidden');
            var teacherIndex=new SS.teacherIndex();
        });
        $('#createTeacherContainer #createTeacherForm #cancel').click(function(){
            $('#createTeacherContainer').addClass('hidden');
            $('#allTeacher').removeClass('hidden');
            var teacherIndex=new SS.teacherIndex();
        });
        $('#allTeacher #back').click(function(){
            $('#allTeacher').addClass('hidden');
            $('#dvshowSchool').removeClass('hidden');
           
            var schoolIndex=new SS.schoolIndex();
        }); 
        $('#allClassroom #back').click(function(){
            $('#allClassroom').addClass('hidden');
            $('#dvshowSchool').removeClass('hidden');
           
            var schoolIndex=new SS.schoolIndex();
        }); 
        $('#createClassroomContainer #createClassForm #cancel').click(function(){
            $('#createClassroomContainer').addClass('hidden');
            $('#allClassroom').removeClass('hidden');
            var classroomIndex=new SS.classroomIndex();
        });
        $('#editClassroomContainer #editClassForm #cancel').click(function(){
            $('#editClassroomContainer').addClass('hidden');
            $('#allClassroom').removeClass('hidden');
            var classroomIndex=new SS.classroomIndex();
        });
        $('#dvSchool #back').click(function(){
            $('#dvSchool').addClass('hidden');
            $('#divIndex').removeClass('hidden');
           
            var Home=new SS.Home();
        }); 
        $('#dvshowSchool #back').click(function(){
            $('#dvshowSchool').addClass('hidden');
            $('#dvSchool').removeClass('hidden');
           
            var schoolIndex=new SS.schoolIndex();
        }); 
        $('#newSchoolContainer #createForm #cancel').click(function(){
            $('#newSchoolContainer').addClass('hidden');
            $('#dvSchool').removeClass('hidden');
            var schoolIndex=new SS.schoolIndex();
        });
        $('#editSchoolContainer #editForm #cancel').click(function(){
            $('#editSchoolContainer').addClass('hidden');
            $('#dvshowSchool').removeClass('hidden');
            var schoolIndex=new SS.schoolIndex();
        });
        $('#allSubjectContainer #back').click(function(){
            $('#allSubjectContainer').addClass('hidden');
            $('#dvSchool').removeClass('hidden');
            var schoolIndex=new SS.schoolIndex();
        });
        $('#subjectContainer #addSubjectForm #cancel').click(function(){
            $('#subjectContainer').addClass('hidden');
            $('#allSubjectContainer').removeClass('hidden');
            var schoolIndex=new SS.schoolIndex();
        });
        $('#dvshowSchool #home').click(function(){
            $('#dvshowSchool').addClass('hidden');
            $('#dvSchool').removeClass('hidden');
            var schoolIndex=new SS.schoolIndex();
        });
        $('#allClassroom #home').click(function(){
            $('#allClassroom').addClass('hidden');
            $('#dvSchool').removeClass('hidden');
            var classroomIndex=new SS.classroomIndex();
        });


	}

}
