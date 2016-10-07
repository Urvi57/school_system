var SS = SS || {};
SS.teacherIndex = function() {
    this.initialize();
}
SS.teacherIndex.prototype ={
    initialize: function () {
    	    this.teacherFormValid();
          this.fillAllTeacher();
          this.saveTeacher();
          this.getTeacherDetails();
          this.getSubjectByClassroom();
          this.linkclickevent();
       		// this.getSubjectByClassroom();
    },
    getTeacherDetails:function(){
    	 var self=this;
         var table = $('#allTeacher #tableTeacher').DataTable();
         table.clear();
         var school_id=$('#allTeacher #hiddenSchoolId').val();
         var subjects="",classrooms="";
        $.ajax({
            url: '/teachers/filtered_index',
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            data:{school_id:school_id},
            success: function (data, textStatus, jqXHR){
                console.log("Teacher Details");
                console.log(data);
                $.each(data, function(i,item){
                subjects="",classrooms="";
                var  total_subject = item.subject_details;
                  for (var j=0;j<total_subject.length;j++) {
                    subjects+=total_subject[j].name+', ';
                  }
                subjects=subjects.substring(0, subjects.length-2);
                 var  total_classroom = item.classroom_details;
                    for (var j=0;j<total_classroom.length;j++) {
                      classrooms+=total_classroom[j].name+', ';
                    }
                classrooms=classrooms.substring(0, classrooms.length-2);
                 table.row.add( $(
                 	// alert(item.name);
                  '<tr>'+
                  '<td>'+item.school_details.name+'</td>'+
                  '<td>'+classrooms+'</td>'+
                  '<td>'+item.name+'</td>'+
                  '<td>'+item.gender+'</td>'+
                  '<td>'+item.phone_no+'</td>'+
                  '<td>'+subjects+'</td>'+
                  '<td><button type="button" id="editTeacher" class="btn btn-info" teacher_id='+item.id+' school_name='+item.school_details.name+' school_id='+school_id+'>'+'Edit</button></td>'+
                  '<td><button type="button" id="destroyTeacher" class="btn btn-info" teacher_id='+item.id+'>'+'Delete</button></td>'+
                  '<tr>'
                  )).draw();
                });
                self.editTeacher();
       			  	self.deleteTeacher();
             },
             error: function (jqXHR, textStatus, errorThrown) {
      		}	
       });
    },
    fillAllTeacher:function(){
      var self=this;
    	$('#allTeacher #createTeacher').unbind();
		  $('#allTeacher #createTeacher').click(function(e){
        e.preventDefault();
         var school_name=$('#allTeacher  #hdnSchoolName').val();
         var school_id=$('#allTeacher #hiddenSchoolId').val();
         $('#createTeacherContainer #createTeacherForm #schoolIdHidden').val(school_id);
         $('#createTeacherContainer #createTeacherForm #schoolName').val(school_name);
		  	 
		 	    $('#allTeacher').addClass('hidden');
          $('#createTeacherContainer').removeClass('hidden');
          $("#createTeacherContainer #createTeacherForm #ddClassroom").empty();
          var teacherIndex=new SS.teacherIndex();
          $.ajax({
          url: '/classrooms/filtered_index',
          type: 'GET',
          contentType: 'application/json',
          format: 'JSON',
          data:{school_id:school_id},
          success: function (data, textStatus, jqXHR){
            console.log("Classroom Details");
            console.log(data);
            $.each(data, function(i,item){
              $("#createTeacherContainer #createTeacherForm #ddClassroom").append('<option value="' + item.id + '">' + item.name + '</option>');
            });
             var classroom_id=$('#createTeacherContainer #createTeacherForm #ddClassroom').val();
             // alert(classroom_id);
             self.getSubjects();
          },
             error: function (jqXHR, textStatus, errorThrown) {
          }
    });
     
     });
    },
    deleteTeacher:function(){
    	$('#allTeacher #destroyTeacher').unbind();
			$('#allTeacher #destroyTeacher').click(function(e){
        e.preventDefault();
				teacher_id = $(this).attr('teacher_id');
        if(confirm('Are you sure!'))
				{
        	$.ajax({
            url: '/teachers/'+teacher_id,
            type: 'DELETE',
            contentType: 'application/json',
            format: 'JSON',
            success: function (data, textStatus, jqXHR){
                 console.log(data.name);
                 $('#allTeacher').removeClass('hidden');
            	 	 var teacherIndex=new SS.teacherIndex();
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
      			}	
      		});
      		}
    	});
    },
    editTeacher:function(){
    var self = this;
		var schoolId = '';
    var subjects="",classrooms="";
		$('#allTeacher #editTeacher').unbind();
			$('#allTeacher #editTeacher').click(function(e){
				e.preventDefault();
				 teacher_id = $(this).attr('teacher_id');
				 school_name=$(this).attr('school_name');
				 school_id=$(this).attr('school_id');
          $('#allTeacher').addClass('hidden');
          $('#editTeacherContainer').removeClass('hidden');
          $("#editTeacherContainer #editTeacherForm #ddSubject").empty();
          $("#editTeacherContainer #editTeacherForm #ddClassroom").empty();
          $.ajax({
            url: 'subjects',
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            success: function (data, textStatus, jqXHR){
                 $.each(data, function(i,item){
                    // $("#ddlSubject").append($("<option />").val(data.id).text(data.Text));
                    $("#editTeacherContainer #editTeacherForm #ddSubject").append('<option value="' + item.id + '">' + item.name + '</option>');

                  });
             },
             error: function (jqXHR, textStatus, errorThrown) {
            // do error handling here
           }  
      });
      $.ajax({
            url: '/classrooms/filtered_index',
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            data:{school_id:school_id},
            success: function (data, textStatus, jqXHR){
                console.log("Classroom Details");
                console.log(data);
                 $.each(data, function(i,item){
                  $("#editTeacherContainer #editTeacherForm #ddClassroom").append('<option value="' + item.id + '">' + item.name + '</option>');
                 });

             },
             error: function (jqXHR, textStatus, errorThrown) {
          } 
      });
      $.ajax({
            url: '/teachers/filtered_index_teacher',
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            data:{teacher_id:teacher_id},
            success: function (data, textStatus, jqXHR){
                  subjects="";
                  classrooms="";
                  var  total_subject = data[0].subject_details;
                    for (var j=0;j<total_subject.length;j++) {
                      subjects+=total_subject[j].id+',';
                    }

                  var  total_classroom = data[0].classroom_details;
                    for (var j=0;j<total_classroom.length;j++) {
                      classrooms+=total_classroom[j].id+',';
                    }
                 console.log(data.name);
                 $('#editTeacherContainer #editTeacherForm #schoolName').val(school_name);
                 $('#editTeacherContainer #editTeacherForm #teacherName').val(data[0].name);
                 $('#editTeacherContainer #editTeacherForm #phoneNo').val(data[0].phone_no);
                 $('#editTeacherContainer #editTeacherForm #schoolIdHidden').val(data[0].id);
                 // var selected = $(data.gender).val();
								 // $("#editTeacherContainer #editTeacherForm #gender :selected").val(data.gender);
                 $.each(subjects.split(","), function(i,e){
                      $("#ddSubject option[value='" + e + "']").prop("selected", true);
                      console.log("subject_ids",e);
                  }); 
                  $.each(classrooms.split(","), function(i,e){
                      $("#ddClassroom option[value='" + e + "']").prop("selected", true);
                     console.log("classroom_ids",e)
                  });   
                 self.updateTeacherDetails(school_id,teacher_id);
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
      			}	
      });
		});
    },
    saveTeacher:function(){
    	$('#createTeacherContainer #createTeacherForm #btnCreateTeacher').unbind();
		  $('#createTeacherContainer #createTeacherForm #btnCreateTeacher').click(function(e){
		  e.preventDefault();
			var subject_ids=new Array();
			var classroom_ids=new Array();
			$('#createTeacherContainer #createTeacherForm #ddSubject :selected').each(function(i, selected){
        subject_ids[i] = $(selected).val();
      });
      $('#createTeacherContainer #createTeacherForm #ddClassroom :selected').each(function(i, selected){
        classroom_ids[i] = $(selected).val();
      });
			console.log(subject_ids);
			console.log(classroom_ids);
			var teacher_data = {name:$("#teacherName").val(), phone_no:$("#phoneNo").val(),
			gender:$("#gender :selected").val(),school_id:$("#schoolIdHidden").val(),
			subject_ids:subject_ids,classroom_ids:classroom_ids}

			if($('#createTeacherContainer #createTeacherForm').valid()){
				console.log(teacher_data);
			 $.ajax({
          url: '/teachers',
          type: 'POST',
          data: {teacher:teacher_data},
          format: 'JSON',
          success: function (data, textStatus, jqXHR){
            $('#allTeacher').removeClass('hidden');
            $('#createTeacherContainer').addClass('hidden');
            var teacherIndex=new SS.teacherIndex();
            },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
            alert(JSON.parse(jqXHR.responseText)["error"]);
      		}	
      	});
			}
			else{
				alert("Please complete form first!!")
			}
			});
    },
    updateTeacherDetails:function(school_id,teacher_id){
    	var self=this;
 	  $('#editTeacherContainer #editTeacherForm #btnEditTeacher').unbind();
		$('#editTeacherContainer #editTeacherForm #btnEditTeacher').click(function(e){
			e.preventDefault();
			// alert("fgvljhgkjuh.kj");
			var subject_ids=new Array();
			var classroom_ids=new Array();
			$('#editTeacherContainer #editTeacherForm #ddSubject :selected').each(function(i, selected){
        subject_ids[i] = $(selected).val();
      });
			$('#editTeacherContainer #editTeacherForm #ddClassroom :selected').each(function(i, selected){
        classroom_ids[i] = $(selected).val();
      });
      console.log(subject_ids);
			console.log(classroom_ids);
			var teacher_data = {name:$("#editTeacherForm  #teacherName").val(), phone_no:$(" #editTeacherForm  #phoneNo").val(),
			gender:$("#editTeacherForm #gender :selected").val(),school_id:school_id,
			subject_ids:subject_ids,classroom_ids:classroom_ids}
			console.log(teacher_data);
			if($('#editTeacherContainer #editTeacherForm').valid()){
				$.ajax({
	       url: '/teachers/'+teacher_id,
	        type: 'PUT',
	        data: {teacher:teacher_data},
	        format: 'JSON',
	        success: function (data, textStatus, jqXHR){
	       	  $('#allTeacher').removeClass('hidden');
            $('#editTeacherContainer').addClass('hidden');
            var teacherIndex=new SS.teacherIndex();
	        },
	        error: function (jqXHR, textStatus, errorThrown) {
	        		// do error handling here
            alert(JSON.parse(jqXHR.responseText)["error"]);
	      	}	
	       });
  		}
  		else{
  		 	alert("Please Complete form first!!");
  		}
	  });
    },
  teacherFormValid: function(){
   $("#createTeacherContainer #createTeacherForm").validate ({
      rules: {
        teacher_class: {
          required: true
        },
        teacher_name: {
          required: true
        },
        teacher_gender: {
          required: true
        },
        teacher_phone: {
          required: true
        },
        teacher_subject: {
          required: true
        },
        teacher_phone: {
          required: true,
          digits: true,
          minlength: 10,
          maxlength: 10
        }
      },
      messages : {
        teacher_class: {
            required: 'Classroom Required'
        },
        teacher_name:{
          required: 'Teacher Name Required'
        },
        teacher_gender:{
          required: 'Select Gender'
        },
         teacher_subject: {
            required: 'Subject Required'
        },
        teacher_phone: {
            required: 'Phone No Required'
        }
      }
    });
    $("#editTeacherContainer #editTeacherForm").validate ({
      rules: {
        teacher_class: {
          required: true
        },
        teacher_name: {
          required: true
        },
        teacher_gender: {
          required: true
        },
        teacher_phone: {
          required: true
        },
        teacher_subject: {
          required: true
        },
        teacher_phone: {
          required: true,
          digits: true,
          minlength: 10,
          maxlength: 10
        }
      },
      messages : {
        teacher_class: {
            required: 'Classroom Required'
        },
        teacher_name:{
          required: 'Teacher Name Required'
        },
        teacher_gender:{
          required: 'Select Gender'
        },
         teacher_subject: {
            required: 'Subject Required'
        },
        teacher_phone: {
            required: 'Phone No Required'
        }
      }
    });
},
getSubjectByClassroom:function()
{
  var self=this;
  $('#createTeacherContainer #createTeacherForm #ddClassroom').unbind();
      $('#createTeacherContainer #createTeacherForm #ddClassroom').on('change',function(e){
        e.preventDefault();
        self.getSubjects();
     });
  },
  linkclickevent: function()
  {
    $('#allTeacher #home').click(function(){
      $('#allTeacher').addClass('hidden'); 
      $('#dvSchool').removeClass('hidden');
    });
    $('#allTeacher #back').click(function(){
      $('#allTeacher').addClass('hidden'); 
      $('#dvshowSchool').removeClass('hidden');
    });
    $('#createTeacherContainer #createTeacherForm #cancel').click(function(){
      $('#createTeacherContainer').addClass('hidden'); 
      $('#allTeacher').removeClass('hidden');
      $('#createTeacherContainer #createTeacherForm')[0].reset("");
     
    });
    $('#editTeacherContainer #editTeacherForm #cancel').click(function(){
      $('#editTeacherContainer').addClass('hidden'); 
      $('#allTeacher').removeClass('hidden');
    });
  },
  getSubjects:function(){
    $("#createTeacherContainer #createTeacherForm #ddSubject").empty();
        var classroom_id=$('#createTeacherContainer #createTeacherForm #ddClassroom').val();
        $.ajax({
          url: '/classrooms/filtered_index_classroom',
          type: 'GET',
          contentType: 'application/json',
          format: 'JSON',
          data:{classroom_id:classroom_id},
          success: function (data, textStatus, jqXHR){
            console.log("Doing",data);
            $.each(data, function(i,item){
              var total_subjects = item.subject_details;
              for (var j=0;j<total_subjects.length;j++) {
                $("#createTeacherContainer #createTeacherForm #ddSubject").append('<option value="' + total_subjects[j].id + '">' + total_subjects[j].name + '</option>');
              }
            }); 
          },
          error: function (jqXHR, textStatus, errorThrown) {
           // do error handling here
          }  
       });
  }
}