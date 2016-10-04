var SS = SS || {};
SS.subjectIndex = function() {
    this.initialize();
   
}
SS.subjectIndex.prototype ={
    initialize: function () {
    	  
        this.subjectFormValid();
        this.saveSubjectData();
        this.getSubjectDetails();
        this.subjectFormValid();
    },
    saveSubjectData: function () {
		$('#subjectContainer #addSubjectForm #submitSubject').unbind();
		$('#subjectContainer #addSubjectForm #submitSubject').click(function(e){
			e.preventDefault();
			var subject = {name:$("#addSubjectForm #subjectName").val()}
			// {name:$("#schoolName").val()
			if($('#subjectContainer #addSubjectForm').valid()){
			 $.ajax({
            url: '/subjects',

            type: 'POST',
            data: {subject:subject},
            
            format: 'JSON',

            success: function (data, textStatus, jqXHR){
            	// alert("Submitted");
                 $('#allSubjectContainer').removeClass('hidden');
                 $('#subjectContainer').addClass('hidden');
            	 var subjectIndex=new SS.subjectIndex();
            	
                
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
      		}	
      	});
       }
       else{
        alert("Please Complete form first!!");

       }

	  });
	},
	getSubjectDetails: function () {
    var self=this;
    var table = $('#allSubjectContainer #tableSubject').DataTable();
    table.clear();
    $.ajax({
      url: 'subjects',
      type: 'GET',
      contentType: 'application/json',
      format: 'JSON',
      success: function (data, textStatus, jqXHR){
      console.log("Subject Details");
      console.log(data);
      $.each(data, function(i,item){
        table.row.add( $(
         '<tr>'+
         '<td>'+item.name+'</td>'+
         '<td><a id="deleteSubject" subject_id='+item.id+' class="btn btn-info">'+'Delete</a></td>'+
         '<tr>'
         )).draw();
        });
        self.destroySubject();
      },
       error: function (jqXHR, textStatus, errorThrown) {
    }	
   });
  },
  destroySubject:function()
  {
 		$('#allSubjectContainer #deleteSubject').unbind();
 		var self=this;
		$('#allSubjectContainer #deleteSubject').click(function(e){
			e.preventDefault();
			subjectId = $(this).attr('subject_id');
			if(confirm('Are you sure!'))
				{
        	$.ajax({
            url: '/subjects/'+subjectId,
            type: 'DELETE',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){
            	self.getSubjectDetails();
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
      			}	
      		});
      	}
	 });
 
  },
  subjectFormValid: function(){
   $("#subjectContainer #addSubjectForm").validate ({
      rules: {
        
        subject_name: {
          required: true
        }
        
      },
      messages : {
        subject_name: {
            required: 'Subject Name Required'
        }
       
      }
    });
    
  }
}