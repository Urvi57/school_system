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
	}

}
